#!/bin/bash

set -e

cd /app
pip install --no-cache-dir -r requirements.txt
flask db upgrade
flask configure-db

echo "[docker-entrypoint.sh] FINISH container setup"

exec "$@"