IF DB_ID('WarehouseApplicationDatabase') IS NULL
	CREATE DATABASE WarehouseApplicationDatabase
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 17.03.2024 11:29:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [WarehouseApplicationDatabase].[dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DeliveryDocument]    Script Date: 17.03.2024 11:29:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [WarehouseApplicationDatabase].[dbo].[DeliveryDocument](
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
/****** Object:  Table [dbo].[Label]    Script Date: 17.03.2024 11:29:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [WarehouseApplicationDatabase].[dbo].[Label](
	[LabelID] [int] IDENTITY(1,1) NOT NULL,
	[LabelName] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Label] PRIMARY KEY CLUSTERED 
(
	[LabelID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LabelDocument]    Script Date: 17.03.2024 11:29:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [WarehouseApplicationDatabase].[dbo].[LabelDocument](
	[LabelID] [int] NOT NULL,
	[DocumentID] [int] NOT NULL,
 CONSTRAINT [PK_LabelDocument] PRIMARY KEY CLUSTERED 
(
	[DocumentID] ASC,
	[LabelID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 17.03.2024 11:29:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [WarehouseApplicationDatabase].[dbo].[Product](
	[ProductID] [int] IDENTITY(1,1) NOT NULL,
	[ProductName] [nvarchar](max) NOT NULL,
	[ProductBarcode] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[ProductID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductList]    Script Date: 17.03.2024 11:29:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [WarehouseApplicationDatabase].[dbo].[ProductList](
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
/****** Object:  Table [dbo].[Storehouse]    Script Date: 17.03.2024 11:29:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [WarehouseApplicationDatabase].[dbo].[Storehouse](
	[StorehouseID] [int] IDENTITY(1,1) NOT NULL,
	[StorehouseName] [nvarchar](max) NOT NULL,
	[StorehouseSymbol] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Storehouse] PRIMARY KEY CLUSTERED 
(
	[StorehouseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Supplier]    Script Date: 17.03.2024 11:29:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [WarehouseApplicationDatabase].[dbo].[Supplier](
	[SupplierID] [int] IDENTITY(1,1) NOT NULL,
	[SupplierName] [nvarchar](max) NOT NULL,
	[SupplierAddress] [nvarchar](max) NOT NULL,
	[SupplierCity] [nvarchar](max) NOT NULL,
	[SupplierZipcode] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Supplier] PRIMARY KEY CLUSTERED 
(
	[SupplierID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [WarehouseApplicationDatabase].[dbo].[DeliveryDocument] ADD  DEFAULT ((0)) FOR [StorehouseID]
GO
ALTER TABLE [WarehouseApplicationDatabase].[dbo].[DeliveryDocument]  WITH CHECK ADD  CONSTRAINT [FK_DeliveryDocument_Storehouse_StorehouseID] FOREIGN KEY([StorehouseID])
REFERENCES [WarehouseApplicationDatabase].[dbo].[Storehouse] ([StorehouseID])
ON DELETE CASCADE
GO
ALTER TABLE [WarehouseApplicationDatabase].[dbo].[DeliveryDocument] CHECK CONSTRAINT [FK_DeliveryDocument_Storehouse_StorehouseID]
GO
ALTER TABLE [WarehouseApplicationDatabase].[dbo].[DeliveryDocument]  WITH CHECK ADD  CONSTRAINT [FK_DeliveryDocument_Supplier_SupplierID] FOREIGN KEY([SupplierID])
REFERENCES [WarehouseApplicationDatabase].[dbo].[Supplier] ([SupplierID])
ON DELETE CASCADE
GO
ALTER TABLE [WarehouseApplicationDatabase].[dbo].[DeliveryDocument] CHECK CONSTRAINT [FK_DeliveryDocument_Supplier_SupplierID]
GO
ALTER TABLE [WarehouseApplicationDatabase].[dbo].[LabelDocument]  WITH CHECK ADD  CONSTRAINT [FK_LabelDocument_DeliveryDocument_DocumentID] FOREIGN KEY([DocumentID])
REFERENCES [WarehouseApplicationDatabase].[dbo].[DeliveryDocument] ([DocumentID])
ON DELETE CASCADE
GO
ALTER TABLE [WarehouseApplicationDatabase].[dbo].[LabelDocument] CHECK CONSTRAINT [FK_LabelDocument_DeliveryDocument_DocumentID]
GO
ALTER TABLE [WarehouseApplicationDatabase].[dbo].[LabelDocument]  WITH CHECK ADD  CONSTRAINT [FK_LabelDocument_Label_LabelID] FOREIGN KEY([LabelID])
REFERENCES [WarehouseApplicationDatabase].[dbo].[Label] ([LabelID])
ON DELETE CASCADE
GO
ALTER TABLE [WarehouseApplicationDatabase].[dbo].[LabelDocument] CHECK CONSTRAINT [FK_LabelDocument_Label_LabelID]
GO
ALTER TABLE [WarehouseApplicationDatabase].[dbo].[ProductList]  WITH CHECK ADD  CONSTRAINT [FK_ProductList_DeliveryDocument_DocumentID] FOREIGN KEY([DocumentID])
REFERENCES [WarehouseApplicationDatabase].[dbo].[DeliveryDocument] ([DocumentID])
ON DELETE CASCADE
GO
ALTER TABLE [WarehouseApplicationDatabase].[dbo].[ProductList] CHECK CONSTRAINT [FK_ProductList_DeliveryDocument_DocumentID]
GO
ALTER TABLE [WarehouseApplicationDatabase].[dbo].[ProductList]  WITH CHECK ADD  CONSTRAINT [FK_ProductList_Product_ProductID] FOREIGN KEY([ProductID])
REFERENCES [WarehouseApplicationDatabase].[dbo].[Product] ([ProductID])
ON DELETE CASCADE
GO
ALTER TABLE [WarehouseApplicationDatabase].[dbo].[ProductList] CHECK CONSTRAINT [FK_ProductList_Product_ProductID]
GO
