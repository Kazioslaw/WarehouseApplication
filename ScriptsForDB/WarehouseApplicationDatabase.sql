IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'WarehouseApplicationDatabase')
	BEGIN
	CREATE DATABASE [WarehouseApplicationDatabase]
	END

GO
USE [WarehouseApplicationDatabase]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 19.04.2024 20:52:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Address]    Script Date: 19.04.2024 20:52:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Address](
	[AddressID] [int] IDENTITY(1,1) NOT NULL,
	[Street] [nvarchar](max) NOT NULL,
	[City] [nvarchar](max) NOT NULL,
	[Zipcode] [nvarchar](max) NOT NULL,
	[Country] [varchar](50) NULL,
 CONSTRAINT [PK_Adress] PRIMARY KEY CLUSTERED 
(
	[AddressID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DeliveryDocument]    Script Date: 19.04.2024 20:52:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DeliveryDocument](
	[DocumentID] [int] IDENTITY(1,1) NOT NULL,
	[IsApproved] [bit] NOT NULL,
	[IsCancelled] [bit] NOT NULL,
	[SupplierID] [int] NOT NULL,
	[StorehouseID] [int] NOT NULL,
 CONSTRAINT [PK_DeliveryDocument] PRIMARY KEY CLUSTERED 
(
	[DocumentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Label]    Script Date: 19.04.2024 20:52:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Label](
	[LabelID] [int] IDENTITY(1,1) NOT NULL,
	[LabelName] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Label] PRIMARY KEY CLUSTERED 
(
	[LabelID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LabelDocument]    Script Date: 19.04.2024 20:52:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LabelDocument](
	[LabelID] [int] NOT NULL,
	[DocumentID] [int] NOT NULL,
 CONSTRAINT [PK_LabelDocument] PRIMARY KEY CLUSTERED 
(
	[DocumentID] ASC,
	[LabelID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 19.04.2024 20:52:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[ProductID] [int] IDENTITY(1,1) NOT NULL,
	[ProductName] [nvarchar](max) NOT NULL,
	[ProductBarcode] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[ProductID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductList]    Script Date: 19.04.2024 20:52:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductList](
	[ListID] [int] IDENTITY(1,1) NOT NULL,
	[DocumentID] [int] NOT NULL,
	[ProductID] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
	[Price] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_ProductList] PRIMARY KEY CLUSTERED 
(
	[ListID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Storehouse]    Script Date: 19.04.2024 20:52:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Storehouse](
	[StorehouseID] [int] IDENTITY(1,1) NOT NULL,
	[StorehouseName] [nvarchar](max) NOT NULL,
	[StorehouseSymbol] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Storehouse] PRIMARY KEY CLUSTERED 
(
	[StorehouseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Supplier]    Script Date: 19.04.2024 20:52:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Supplier](
	[SupplierID] [int] IDENTITY(1,1) NOT NULL,
	[SupplierName] [nvarchar](max) NOT NULL,
	[AddressID] [int] NOT NULL,
 CONSTRAINT [PK_Supplier] PRIMARY KEY CLUSTERED 
(
	[SupplierID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[DeliveryDocument] ADD  DEFAULT ((0)) FOR [StorehouseID]
GO
ALTER TABLE [dbo].[Supplier] ADD  DEFAULT ((0)) FOR [AddressID]
GO
ALTER TABLE [dbo].[DeliveryDocument]  WITH CHECK ADD  CONSTRAINT [FK_DeliveryDocument_Storehouse_StorehouseID] FOREIGN KEY([StorehouseID])
REFERENCES [dbo].[Storehouse] ([StorehouseID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[DeliveryDocument] CHECK CONSTRAINT [FK_DeliveryDocument_Storehouse_StorehouseID]
GO
ALTER TABLE [dbo].[DeliveryDocument]  WITH CHECK ADD  CONSTRAINT [FK_DeliveryDocument_Supplier_SupplierID] FOREIGN KEY([SupplierID])
REFERENCES [dbo].[Supplier] ([SupplierID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[DeliveryDocument] CHECK CONSTRAINT [FK_DeliveryDocument_Supplier_SupplierID]
GO
ALTER TABLE [dbo].[LabelDocument]  WITH CHECK ADD  CONSTRAINT [FK_LabelDocument_DeliveryDocument_DocumentID] FOREIGN KEY([DocumentID])
REFERENCES [dbo].[DeliveryDocument] ([DocumentID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[LabelDocument] CHECK CONSTRAINT [FK_LabelDocument_DeliveryDocument_DocumentID]
GO
ALTER TABLE [dbo].[LabelDocument]  WITH CHECK ADD  CONSTRAINT [FK_LabelDocument_Label_LabelID] FOREIGN KEY([LabelID])
REFERENCES [dbo].[Label] ([LabelID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[LabelDocument] CHECK CONSTRAINT [FK_LabelDocument_Label_LabelID]
GO
ALTER TABLE [dbo].[ProductList]  WITH CHECK ADD  CONSTRAINT [FK_ProductList_DeliveryDocument_DocumentID] FOREIGN KEY([DocumentID])
REFERENCES [dbo].[DeliveryDocument] ([DocumentID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ProductList] CHECK CONSTRAINT [FK_ProductList_DeliveryDocument_DocumentID]
GO
ALTER TABLE [dbo].[ProductList]  WITH CHECK ADD  CONSTRAINT [FK_ProductList_Product_ProductID] FOREIGN KEY([ProductID])
REFERENCES [dbo].[Product] ([ProductID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ProductList] CHECK CONSTRAINT [FK_ProductList_Product_ProductID]
GO
ALTER TABLE [dbo].[Supplier]  WITH CHECK ADD  CONSTRAINT [FK_Supplier_Adress_AddressID] FOREIGN KEY([AddressID])
REFERENCES [dbo].[Address] ([AddressID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Supplier] CHECK CONSTRAINT [FK_Supplier_Adress_AddressID]
GO
