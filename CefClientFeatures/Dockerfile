FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
ENV NODE_VERSION 9.8.0 
ENV NODE_DOWNLOAD_URL https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz 
ENV NODE_DOWNLOAD_SHA 4e519de3507f810b6567d995169c4b36f433bf5731340ebc1fbbd0b6b6e6c310 
RUN curl -SL "$NODE_DOWNLOAD_URL" --output nodejs.tar.gz \ 
     && echo "$NODE_DOWNLOAD_SHA nodejs.tar.gz" | sha256sum -c - \ 
     && tar -xzf "nodejs.tar.gz" -C /usr/local --strip-components=1 \ 
     && rm nodejs.tar.gz \ 
     && ln -s /usr/local/bin/node /usr/local/bin/nodejs
EXPOSE 80 443

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["CefClientFeatures/CefClientFeatures.csproj", "CefClientFeatures/"]
RUN dotnet restore "CefClientFeatures/CefClientFeatures.csproj"
COPY . .
WORKDIR "/src/CefClientFeatures"
RUN dotnet build "CefClientFeatures.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "CefClientFeatures.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "CefClientFeatures.dll"]