using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace University.core.Forms
{
    public class UpdateStudentForm
    {
        [Required]
        public string Name { get; set; }

    }
}
