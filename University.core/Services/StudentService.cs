using University.core.DOTs;
using University.core.Forms;
using University.data.Entites;
using University.data.Repositories;

namespace University.core.Services
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _studentRepository;

        public StudentService(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        public void Create(CreateStudentForm form)
        {
            if(form == null)
            {
                throw new ArgumentNullException(nameof(form));
            }
            if (string.IsNullOrWhiteSpace(form.Name))
            {
                throw new ArgumentException("Name cannot be empty", nameof(form.Name));
            }
            if (string.IsNullOrWhiteSpace(form.Email))
            {
                throw new ArgumentException("Email cannot be empty", nameof(form.Email));
            }
            var student = new Student()
            {
                Name = form.Name,
                Email = form.Email
            };

            _studentRepository.Ceate(student);
            _studentRepository.SaveChanges();

        }

        public void Delete(int id)
        {
            var student = _studentRepository.GetById(id);
            if (student == null)
            {
                throw new ArgumentNullException(nameof(student));
            }

            _studentRepository.Delete(student);
            _studentRepository.SaveChanges();

        }

        public List<StudentDTO> GetAll()
        {
            var students = _studentRepository.GetAll();

            var dtos = students.Select(s => new StudentDTO
            {
                Id = s.Id,
                Name = s.Name,
                Email = s.Email
            }).ToList();
            
                return dtos; 
        }

        public StudentDTO GetById(int id)
        {
            var student = _studentRepository.GetById(id);
            if (student == null)
            {
                throw new ArgumentNullException(nameof(student));
            }
            var dto = new StudentDTO
            {
                Id = student.Id,
                Name = student.Name,
                Email = student.Email
            };
            return dto;

        }

        public void Update(int id, UpdateStudentForm form)
        {
            if (form == null)
            {
                throw new ArgumentNullException(nameof(form));
            }
            if (string.IsNullOrWhiteSpace(form.Name))
            {
                throw new ArgumentException("Name cannot be empty", nameof(form.Name));
            }

            var student = _studentRepository.GetById(id);

            if (student == null)
            {
                throw new ArgumentNullException(nameof(student));
            }
            student.Name = form.Name;

            _studentRepository.Update(student);
            _studentRepository.SaveChanges();
        }
    }

    public interface IStudentService
    {
        StudentDTO GetById(int id);
        List<StudentDTO> GetAll();
        void Create(CreateStudentForm form);
        void Update(int id, UpdateStudentForm form);
        void Delete(int id);
    }
    }
