# Reinstall the main page code
receipt:
	rsync -avh --delete receipt /var/www/receipt/static

# Reinstall admin page code
admin:
	rsync -avh --delete admin /var/www/receipt/static



.PHONY: admin receipt
