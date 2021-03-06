USE [BDSeguridadPokemon]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 12/07/2020 20:08:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NombreUsuario] [varchar](100) NOT NULL,
	[Clave] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Usuarios] ON 

INSERT [dbo].[Usuarios] ([Id], [NombreUsuario], [Clave]) VALUES (1, N'aportilla', N'12345')
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
/****** Object:  StoredProcedure [dbo].[SP_ValidarUsuario]    Script Date: 12/07/2020 20:08:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 create PROCEDURE [dbo].[SP_ValidarUsuario]
 @nombreUsuario varchar(100),
 @clave varchar(100)
 AS 
 Begin
  Select NombreUsuario,Clave from Usuarios
  where NombreUsuario=@nombreUsuario and Clave=@clave
 end
GO
