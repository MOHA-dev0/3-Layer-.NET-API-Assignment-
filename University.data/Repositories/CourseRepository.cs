using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using University.data.Entites;
using University.Data.Context;

namespace University.data.Repositories
{
    public class CourseRepository : ICourseRepository
    {

        private readonly UniversityDbContext _context;
        public CourseRepository(UniversityDbContext context)
        {
            _context = context;
        }
        public void Ceate(Course course)
        {
            if (course == null)
            {
                throw new ArgumentNullException(nameof(course));

            }

            course.CreatedTime = DateTime.Now;
            _context.Courses.Add(course);
            _context.SaveChanges();
        }

        public void Delete(Course course)
        {
            if (course == null)
            {
                throw new ArgumentNullException(nameof(course));

            }
            _context.Courses.Remove(course);
            _context.SaveChanges();

        }


        public List<Course> GetAll()
        {
            if (_context.Courses == null)
            {
                throw new InvalidOperationException("Courses DbSet is not initialized.");
            }
            return _context.Courses.ToList();
        }

        public Course GetById(int id)
        {
           
            var course = _context.Courses.Find(id);
            if (course == null)
            {
                throw new KeyNotFoundException($"Course with ID {id} not found.");
            }
            return course;

        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public void Update(Course course)
        {
            if (course == null)
            {
                throw new ArgumentNullException(nameof(course));

            }

            course.CreatedTime = DateTime.Now;
            _context.Courses.Update(course);
            _context.SaveChanges();
        }
    }

}
    public interface ICourseRepository
    {
         Course GetById(int id);

        List<Course> GetAll();
        void Ceate(Course course);

        void Update(Course course);

        void Delete(Course course);

        void SaveChanges();
    }
