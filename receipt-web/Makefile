# Install all required modules
install-dependencies:
	npm install

# Compile application for production environment
# into "dist" directory
build: install-dependencies
	npm run build

# Run application on temporary web-server in
# development mode
demo: install-dependencies
	npm run demo

deploy: build
	rsync -avh --delete dist/* /var/www/receipt/static/receipt_vue
