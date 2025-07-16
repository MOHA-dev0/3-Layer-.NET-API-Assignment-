using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace University.core.Exceptions
{
    public class NotFoundException :Exception
    {
        public NotFoundException(string message) : base(message)
        {
        }
        public NotFoundException() : base("The requested resource was not found.")
        {
        }
    }
}
