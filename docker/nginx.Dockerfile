# Base image
FROM nginx:alpine

# Set working directory inside nginx html folder
WORKDIR /usr/share/nginx/html

# Copy Vitest reports into container
# This assumes your volume mount will write to /usr/share/nginx/html/unit
# If you want, you can pre-copy a sample report for dev purposes
# COPY ../reports/unit ./unit

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx in foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]
