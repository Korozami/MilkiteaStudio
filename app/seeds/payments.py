from app.models import db, Payment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


def seed_payments():
    demo_payment = Payment(
        user_id=4, card_number=451253922148224, name="Demo Login", expiration_date=date(2025, 8, 1), security_code=5812, billing_address="10422 DeAddress Park PL, DeCity, DE 58122"
    )
    marnie_payment= Payment(
        user_id=5, card_number=451254422148224, name="Marnie June", expiration_date=date(2025, 8, 1), security_code=5822, billing_address="10422 Marnie Park PL, MaCity, MA 58125"
    )

    db.session.add(demo_payment)
    db.session.add(marnie_payment)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_payments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.payments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM payments"))

    db.session.commit()
