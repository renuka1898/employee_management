using EmployeeManagementSystem.API.Data;
using EmployeeManagementSystem.API.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeDbContext _employeeDbContext;

        public EmployeesController(EmployeeDbContext employeeDbContext)
        {
            _employeeDbContext = employeeDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _employeeDbContext.Employees.ToListAsync();
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _employeeDbContext.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }
            return employee;

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, [FromBody] Employee employee)
        
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }
            _employeeDbContext.Entry(employee).State = EntityState.Modified;

            try
            {
                await _employeeDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Employee>>PostEmployee(Employee employee)
        {
            _employeeDbContext.Employees.Add(employee);
            await _employeeDbContext.SaveChangesAsync();
            return CreatedAtAction("GetEmployee", new {id = employee.Id}, employee);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _employeeDbContext.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            _employeeDbContext.Employees.Remove(employee);
            await _employeeDbContext.SaveChangesAsync();
            return NoContent();
        }
        private bool EmployeeExists(int id)
        {
            return _employeeDbContext.Employees.Any(e => e.Id == id);
        }
    }
}
