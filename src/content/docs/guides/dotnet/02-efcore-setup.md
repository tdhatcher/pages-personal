---
title: EF Core Setup and Best Practices
description: Setting up Entity Framework Core correctly from the start, including migrations, seeding, and configuration patterns.
---

Getting EF Core set up well from day one saves significant pain later. Here's the configuration I use on every project.

## Installation

```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet tool install --global dotnet-ef
```

## DbContext Configuration

Define your `DbContext` in the Infrastructure project, not the Api:

```csharp
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Order> Orders => Set<Order>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Auto-apply all IEntityTypeConfiguration<T> in this assembly
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}
```

## Entity Configuration

Use `IEntityTypeConfiguration<T>` — keep mapping out of the entity class:

```csharp
public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Email).HasMaxLength(256).IsRequired();
        builder.HasIndex(u => u.Email).IsUnique();
    }
}
```

## Registration

```csharp
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
```

## Migrations

```bash
# Add a migration (run from solution root)
dotnet ef migrations add InitialCreate --project src/MyApp.Infrastructure --startup-project src/MyApp.Api

# Apply migrations
dotnet ef database update --project src/MyApp.Infrastructure --startup-project src/MyApp.Api
```

## Auto-Migrate on Startup (Dev Only)

```csharp
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.MigrateAsync();
}
```

Never auto-migrate in production — run migrations as a deployment step instead.
