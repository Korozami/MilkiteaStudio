from flask.cli import AppGroup
from .users import seed_users, undo_users
from .addresses import seed_addresses, undo_addresses
from .payments import seed_payments, undo_payments
from .store import seed_store, undo_store
from .products import seed_products, undo_products
from .carts import seed_carts, undo_carts

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_carts()
        undo_products()
        undo_addresses()
        undo_payments()
        undo_store()
        undo_users()
    seed_users()
    seed_store()
    seed_payments()
    seed_addresses()
    seed_products()
    seed_carts()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_carts()
    undo_products()
    undo_addresses()
    undo_payments()
    undo_store()
    undo_users()
    # Add other undo functions here
