#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["chatmvc.csproj", "."]
RUN dotnet restore "chatmvc.csproj"
COPY . .
WORKDIR "/src"
RUN dotnet build "chatmvc.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "chatmvc.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "chatmvc.dll"]