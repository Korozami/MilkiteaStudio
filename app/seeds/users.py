from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    sena = User(
        first_name="Sena", last_name="Tea", username="MilkiTeaStudio", email='sena@gmail.com', password='mikimouse', admin=True
    )
    koro = User(
        first_name='Kevin', last_name='S', username='Korozami', email='koro@gmail.com', password='koromouse', admin=True
    )
    adminDemo = User(
        first_name="DemoA", last_name="loginA", username='DemoA', email='demoA@aa.io', password='password', admin=True
    )
    demo = User(
        first_name="Demo", last_name="login", username='Demo', email='demo@aa.io', password='password', admin=False)
    marnie = User(
        first_name="Marnie", last_name="June", username='marnie', email='marnie@aa.io', password='password', admin=False)
    bobbie = User(
        first_name="Bobbie", last_name="June", username='bobbie', email='bobbie@aa.io', password='password', admin=False)

    db.session.add(sena)
    db.session.add(koro)
    db.session.add(adminDemo)
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
