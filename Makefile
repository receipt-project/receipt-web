# Reinstall the main page code
receipt:
	mkdir -p /var/www/receipt/static/receipt/
	rm -rf /var/www/receipt/static/receipt/*
	cp -r receipt/ /var/www/receipt/static/

# Reinstall admin page code
admin:
	mkdir -p /var/www/receipt/static/admin/
	rm -rf /var/www/receipt/static/admin/*
	cp -r admin/ /var/www/receipt/static/


.PHONY: admin receipt
