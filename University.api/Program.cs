using Autofac;
using Autofac.Extensions.DependencyInjection;
using University.core.Services;
using University.data.Repositories;
using University.Data.Contexts;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());

builder.Host.ConfigureContainer<ContainerBuilder>(container =>
{
    container.RegisterType<UniversityDbContext>().AsSelf().InstancePerLifetimeScope();
    container.RegisterType<StudentRepository>().As<IStudentRepository>().InstancePerLifetimeScope();
    container.RegisterType<StudentService>().As<IStudentService>().InstancePerLifetimeScope();
});

// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();