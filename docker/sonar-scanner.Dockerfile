FROM openjdk:17-jdk-slim

RUN apt-get update && apt-get install -y curl unzip && rm -rf /var/lib/apt/lists/*

RUN curl --fail -L -o sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.8.0.2856-linux.zip \
    && unzip sonar-scanner.zip \
    && rm sonar-scanner.zip \
    && mv sonar-scanner-4.8.0.2856-linux /opt/sonar-scanner



ENV PATH="/opt/sonar-scanner/bin:${PATH}"
ENV SONAR_SCANNER_OPTS="-Xmx512m"

CMD ["sonar-scanner"]
