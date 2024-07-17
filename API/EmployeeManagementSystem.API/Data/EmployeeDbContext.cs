

using EmployeeManagementSystem.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.API.Data
{
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options) 
        { 
        }
        public DbSet<Employee> Employees { get; set; }
    }
}
