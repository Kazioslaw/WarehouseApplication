﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WarehouseApplication.Server.Data;

#nullable disable

namespace WarehouseApplication.Server.Data.Migrations
{
    [DbContext(typeof(WarehouseApplicationServerContext))]
    partial class WarehouseApplicationServerContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("DeliveryDocumentLabel", b =>
                {
                    b.Property<int>("DocumentsDocumentID")
                        .HasColumnType("int");

                    b.Property<int>("LabelsLabelID")
                        .HasColumnType("int");

                    b.HasKey("DocumentsDocumentID", "LabelsLabelID");

                    b.HasIndex("LabelsLabelID");

                    b.ToTable("DeliveryDocumentLabel");
                });

            modelBuilder.Entity("WarehouseApplication.Server.Models.DeliveryDocument", b =>
                {
                    b.Property<int>("DocumentID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("DocumentID"));

                    b.Property<bool>("IsApproved")
                        .HasColumnType("bit");

                    b.Property<bool>("IsCancelled")
                        .HasColumnType("bit");

                    b.Property<int>("StorehouseID")
                        .HasColumnType("int");

                    b.Property<int>("SupplierID")
                        .HasColumnType("int");

                    b.HasKey("DocumentID");

                    b.HasIndex("StorehouseID");

                    b.HasIndex("SupplierID");

                    b.ToTable("DeliveryDocument");
                });

            modelBuilder.Entity("WarehouseApplication.Server.Models.Label", b =>
                {
                    b.Property<int>("LabelID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("LabelID"));

                    b.Property<string>("LabelName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("LabelID");

                    b.ToTable("Label");
                });

            modelBuilder.Entity("WarehouseApplication.Server.Models.Product", b =>
                {
                    b.Property<int>("ProductID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProductID"));

                    b.Property<string>("ProductBarcode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProductName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ProductID");

                    b.ToTable("Product");
                });

            modelBuilder.Entity("WarehouseApplication.Server.Models.ProductList", b =>
                {
                    b.Property<int>("ListId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ListId"));

                    b.Property<int>("DocumentID")
                        .HasColumnType("int");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("ProductID")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("ListId");

                    b.HasIndex("DocumentID");

                    b.HasIndex("ProductID");

                    b.ToTable("ProductList");
                });

            modelBuilder.Entity("WarehouseApplication.Server.Models.Storehouse", b =>
                {
                    b.Property<int>("StorehouseID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("StorehouseID"));

                    b.Property<string>("StorehouseName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StorehouseSymbol")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("StorehouseID");

                    b.ToTable("Storehouse");
                });

            modelBuilder.Entity("WarehouseApplication.Server.Models.Supplier", b =>
                {
                    b.Property<int>("SupplierID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SupplierID"));

                    b.Property<string>("SupplierAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SupplierCity")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SupplierName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SupplierZipcode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("SupplierID");

                    b.ToTable("Supplier");
                });

            modelBuilder.Entity("DeliveryDocumentLabel", b =>
                {
                    b.HasOne("WarehouseApplication.Server.Models.DeliveryDocument", null)
                        .WithMany()
                        .HasForeignKey("DocumentsDocumentID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WarehouseApplication.Server.Models.Label", null)
                        .WithMany()
                        .HasForeignKey("LabelsLabelID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WarehouseApplication.Server.Models.DeliveryDocument", b =>
                {
                    b.HasOne("WarehouseApplication.Server.Models.Storehouse", "Storehouse")
                        .WithMany("Documents")
                        .HasForeignKey("StorehouseID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WarehouseApplication.Server.Models.Supplier", "Supplier")
                        .WithMany("Documents")
                        .HasForeignKey("SupplierID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Storehouse");

                    b.Navigation("Supplier");
                });

            modelBuilder.Entity("WarehouseApplication.Server.Models.ProductList", b =>
                {
                    b.HasOne("WarehouseApplication.Server.Models.DeliveryDocument", "Document")
                        .WithMany("Products")
                        .HasForeignKey("DocumentID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WarehouseApplication.Server.Models.Product", "Product")
                        .WithMany("Products")
                        .HasForeignKey("ProductID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Document");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("WarehouseApplication.Server.Models.DeliveryDocument", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("WarehouseApplication.Server.Models.Product", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("WarehouseApplication.Server.Models.Storehouse", b =>
                {
                    b.Navigation("Documents");
                });

            modelBuilder.Entity("WarehouseApplication.Server.Models.Supplier", b =>
                {
                    b.Navigation("Documents");
                });
#pragma warning restore 612, 618
        }
    }
}
