using BeefShopAPI.Data.Context;
using BeefShopAPI.Data.Repositories;
using BeefShopAPI.Data.Repositories.Interfaces;
using BeefShopAPI.Service;
using BeefShopAPI.Service.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<BeefShopAPIDbContext>(option => option.UseSqlServer(connectionString));

builder.Services.AddScoped<IMeatService, MeatService>();
builder.Services.AddScoped<IMeatRepository, MeatRepository>();

// builder.Services.AddCors(options =>
// {
//   options.AddPolicy("AllowReactApp", policy =>
//   {
//     policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
//   });
// });

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// app.UseCors("AllowReactApp");

app.UseAuthorization();
app.MapControllers();
app.Run();