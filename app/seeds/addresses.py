from app.models import db, Address, environment, SCHEMA
from sqlalchemy.sql import text


def seed_addresses():
    demo_address = Address(
        user_id=4, city="DeCity", address="10422 DeAddress Park PL", state="DE", country="United States", zip=58122
    )
    marnie_address= Address(
        user_id=5, city="MaCity", address="10422 Marnie Park PL", state="MA", country="United States", zip=58125
    )

    db.session.add(demo_address)
    db.session.add(marnie_address)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_addresses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.opinions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM addresses"))

    db.session.commit()
