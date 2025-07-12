using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using University.data.Entites;

namespace University.Data.Contexts.ClassMappings
{
    public class StudentMapping : IEntityTypeConfiguration<Student>

    {
        public void Configure(EntityTypeBuilder<Student> builder)
        {
            builder.HasKey(s => s.Id);
            builder.Property(s => s.Id)
                .HasColumnName("StudentID");

            builder.Property(s => s.Name).HasMaxLength(256);
        }
    }
}