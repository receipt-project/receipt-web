# Reinstall admin page code
admin:
	rsync -avh --delete admin /var/www/receipt/static



.PHONY: admin receipt
