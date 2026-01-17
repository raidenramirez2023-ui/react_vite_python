from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import random

app = Flask(__name__)
# SIMPLE CORS SETUP - ETO ANG MAHALAGA!
CORS(app)

# Simple data storage
service_requests = []
request_counter = 1

# ROUTE 1: Health check (for testing)
@app.route('/')
def home():
    return "Santa Cruz Water District API is running!"

# ROUTE 2: Test if API is working
@app.route('/api/test', methods=['GET'])
def test_api():
    return jsonify({"status": "ok", "message": "API is working!"})

# ROUTE 3: FIXED CALCULATE BILL
@app.route('/api/calculate-bill', methods=['GET', 'POST'])
def calculate_bill():
    """Calculate water bill - accepts both GET and POST"""
    try:
        # Get data based on method
        if request.method == 'POST':
            data = request.get_json()
            if not data:
                return jsonify({"error": "No JSON data provided"}), 400
        else:  # GET method
            consumption = request.args.get('consumption', '0')
            customer_type = request.args.get('customer_type', 'residential')
            data = {
                "consumption": float(consumption) if consumption else 0,
                "customer_type": customer_type
            }
        
        # Extract values
        consumption = float(data.get('consumption', 0))
        customer_type = data.get('customer_type', 'residential')
        
        # Validate
        if consumption <= 0:
            return jsonify({"error": "Consumption must be greater than 0"}), 400
        
        # Simple calculation
        if customer_type == 'residential':
            if consumption <= 10:
                total = 180.00
                breakdown = ["First 10 cu.m: ₱180.00"]
            elif consumption <= 20:
                total = 180.00 + (consumption - 10) * 22.50
                breakdown = [
                    "First 10 cu.m: ₱180.00",
                    f"Next {consumption-10} cu.m: ₱{(consumption-10)*22.50:.2f}"
                ]
            elif consumption <= 30:
                total = 180.00 + 10 * 22.50 + (consumption - 20) * 28.00
                breakdown = [
                    "First 10 cu.m: ₱180.00",
                    "Next 10 cu.m: ₱225.00",
                    f"Next {consumption-20} cu.m: ₱{(consumption-20)*28.00:.2f}"
                ]
            else:
                total = 180.00 + 10 * 22.50 + 10 * 28.00 + (consumption - 30) * 35.00
                breakdown = [
                    "First 10 cu.m: ₱180.00",
                    "Next 10 cu.m: ₱225.00",
                    "Next 10 cu.m: ₱280.00",
                    f"Remaining {consumption-30} cu.m: ₱{(consumption-30)*35.00:.2f}"
                ]
        else:  # commercial
            if consumption <= 20:
                total = 450.00
                breakdown = ["First 20 cu.m: ₱450.00"]
            elif consumption <= 40:
                total = 450.00 + (consumption - 20) * 40.00
                breakdown = [
                    "First 20 cu.m: ₱450.00",
                    f"Next {consumption-20} cu.m: ₱{(consumption-20)*40.00:.2f}"
                ]
            else:
                total = 450.00 + 20 * 40.00 + (consumption - 40) * 45.00
                breakdown = [
                    "First 20 cu.m: ₱450.00",
                    "Next 20 cu.m: ₱800.00",
                    f"Remaining {consumption-40} cu.m: ₱{(consumption-40)*45.00:.2f}"
                ]
        
        return jsonify({
            "success": True,
            "consumption": consumption,
            "customer_type": customer_type,
            "total_bill": round(total, 2),
            "breakdown": breakdown,
            "calculated_at": datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ROUTE 4: FIXED SERVICE REQUEST
@app.route('/api/service-request', methods=['GET', 'POST'])
def create_service_request():
    """Create service request - accepts both GET and POST"""
    global request_counter
    
    try:
        if request.method == 'POST':
            data = request.get_json()
            if not data:
                return jsonify({"error": "No JSON data provided"}), 400
        else:  # GET method - for testing
            data = {
                "name": request.args.get('name', 'Test User'),
                "email": request.args.get('email', 'test@example.com'),
                "phone": request.args.get('phone', '09171234567'),
                "address": request.args.get('address', 'Test Address'),
                "service_type": request.args.get('service_type', 'new_connection'),
                "message": request.args.get('message', 'Test message')
            }
        
        # Create request
        new_request = {
            "id": request_counter,
            "name": data.get('name'),
            "email": data.get('email'),
            "phone": data.get('phone'),
            "address": data.get('address'),
            "service_type": data.get('service_type', 'new_connection'),
            "message": data.get('message', ''),
            "status": "pending",
            "created_at": datetime.now().isoformat()
        }
        
        service_requests.append(new_request)
        request_counter += 1
        
        return jsonify({
            "success": True,
            "message": "Service request submitted successfully!",
            "request_id": new_request['id'],
            "reference_number": f"SR-{new_request['id']:06d}",
            "data": new_request
        }), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ROUTE 5: Get all service requests (for testing)
@app.route('/api/service-requests', methods=['GET'])
def get_service_requests():
    return jsonify({
        "count": len(service_requests),
        "requests": service_requests
    })

# ROUTE 6: Other working endpoints
@app.route('/api/announcements', methods=['GET'])
def get_announcements():
    return jsonify([
        {
            "id": 1,
            "title": "Scheduled Water Interruption",
            "content": "Water service will be interrupted on Jan 20, 2026",
            "date": "2026-01-15",
            "type": "maintenance"
        }
    ])

@app.route('/api/stats', methods=['GET'])
def get_stats():
    return jsonify({
        "totalCustomers": "15,842",
        "dailyConsumption": "2.5M",
        "serviceRequests": len(service_requests),
        "satisfactionRate": "94%"
    })

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    
    print("🚀 Santa Cruz Water District API")
    print(f"📍 Running on port: {port}")
    print("📌 Endpoints ready!")
    
    # Check if running in production (Render sets PORT env variable)
    is_production = 'PORT' in os.environ
    
    if is_production:
        print("🔧 Mode: PRODUCTION")
        app.run(host='0.0.0.0', port=port, debug=False)
    else:
        print("🔧 Mode: DEVELOPMENT")
        app.run(host='0.0.0.0', port=port, debug=True)