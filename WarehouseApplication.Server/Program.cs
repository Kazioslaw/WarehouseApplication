using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WarehouseApplication.Server.Data;

namespace WarehouseApplication.Server
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			builder.Services.AddDbContext<WarehouseApplicationServerContext>(options =>
			    options.UseSqlServer(builder.Configuration.GetConnectionString("WarehouseApplicationServerContext") ?? throw new InvalidOperationException("Connection string 'WarehouseApplicationServerContext' not found.")));

			// Add services to the container.

			builder.Services.AddControllers();
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			builder.Services.AddCors(
				options=> options.AddPolicy("AllowAngularOrigins",
				builder =>
				{
					builder.WithOrigins("https://localhost:4200",
						"http://localhost:4200").AllowAnyHeader().AllowAnyMethod();

				}));

			var app = builder.Build();

			app.UseDefaultFiles();
			app.UseStaticFiles();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseHttpsRedirection();

			app.UseAuthorization();


			app.MapControllers();
			app.UseCors("AllowAngularOrigins");
			app.MapFallbackToFile("/index.html");

			app.Run();
		}
	}
}
