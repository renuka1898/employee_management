﻿

namespace EmployeeManagementSystem.API.Models.Domain
{
    public class Employee
    {
       
        public int Id { get; set; }
        public string Name { get; set; }
        public string Department { get; set; }
        public decimal Salary { get; set; }
    }
}
