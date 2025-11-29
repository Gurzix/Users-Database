from flask import request, jsonify
from config import app, db
from models import User


@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    list_of_users = list(map(lambda x: x.to_json(), users))
    return jsonify({"users": list_of_users}), 200


@app.route('/create', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'])
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    return jsonify(new_user.to_json()), 201


@app.route('/update/<int:user_id>', methods=['PATCH'])
def update_contact(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    data = request.json
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    try:
        db.session.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    return jsonify(user.to_json()), 200


@app.route('/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    try:
        db.session.delete(user)
        db.session.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    return jsonify({"message": "User deleted successfully"}), 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)
