# docker/sonar-scanner.Dockerfile
FROM sonarsource/sonar-scanner-cli

WORKDIR /app
COPY . .

# sonar-scanner CLI is in the image. Use sh -c to wait for SonarQube then run scanner.
# The sonar token must be passed as SONAR_TOKEN env var by docker-compose.
CMD ["sh", "-c", "npx wait-on http://sonarqube:9000 && sonar-scanner -Dsonar.host.url=http://sonarqube:9000 -Dsonar.login=${SONAR_TOKEN}"]
