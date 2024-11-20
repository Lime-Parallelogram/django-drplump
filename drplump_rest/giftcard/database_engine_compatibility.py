# GiftCard module has been ported over from an old system and parts of the code are yet to be ported to Django ORM

from django.db import connection

def executeQuery(query):
    with connection.cursor() as cursor:
        for part in query.split(";"):  # Compatibility Work-Around: Allow multi-query sequences
            if len(part) > 0:
                cursor.execute(part)

        return cursor.fetchall()