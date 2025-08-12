FROM eclipse-temurin:17-jdk

RUN apt-get update && apt-get install -y curl unzip && rm -rf /var/lib/apt/lists/*

# Use latest scanner version compatible with SonarQube 25.x
RUN curl --fail -L -o sonar-scanner.zip \
    https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip \
    && unzip sonar-scanner.zip \
    && rm sonar-scanner.zip \
    && mv sonar-scanner-5.0.1.3006-linux /opt/sonar-scanner \
    && ln -s /opt/sonar-scanner/bin/sonar-scanner /usr/local/bin/sonar-scanner

ENV JAVA_HOME=/opt/java/openjdk
ENV PATH="${JAVA_HOME}/bin:/opt/sonar-scanner/bin:${PATH}"
ENV SONAR_SCANNER_OPTS="-Xmx2048m"

CMD ["sonar-scanner", "-Dsonar.host.url=http://qube:9000", "-Dsonar.token=${SONAR_TOKEN}"]
