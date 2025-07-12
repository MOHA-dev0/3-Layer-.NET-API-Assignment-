using AutoWrapper.Wrappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using University.core.Forms;
using University.core.Services;
using University.data.Repositories;
using University.Data.Contexts;

namespace University.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;
        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;

        }

        [HttpGet("{id}")]

        public ApiResponse GetById(int id)
        {
            var dto = _studentService.GetById(id);
            
            return  new ApiResponse(dto);
        }
        [HttpGet()]

        public ApiResponse GetAll(int id)
        {
            var dto = _studentService.GetAll();

            return new ApiResponse(dto);
        }

        [HttpPost()]

        public ApiResponse Craete([FromBody] CreateStudentForm form )
        {
            _studentService.Create(form);

            return new ApiResponse(HttpStatusCode.Created);
        }

        [HttpPut("{id}")]

        public ApiResponse Update(int id ,[FromBody] UpdateStudentForm form)
        {
            _studentService.Update(id ,form);

            return new ApiResponse(HttpStatusCode.OK);
        }

        [HttpDelete("{id}")]
        public ApiResponse Delete(int id)
        {
            _studentService.Delete(id);
            return new ApiResponse(HttpStatusCode.OK);
        }
    }
}

