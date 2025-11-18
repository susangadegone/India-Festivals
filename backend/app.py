from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import os
import sys
import importlib.util
import json

# Workaround: Import directly from festival.py due to package bug
festival_path = os.path.join(os.path.dirname(__file__), 'venv/lib/python3.13/site-packages/indian_festivals/festival.py')
spec = importlib.util.spec_from_file_location("festival", festival_path)
festival_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(festival_module)
IndianFestivals = festival_module.IndianFestivals

app = Flask(__name__)
CORS(app)  # Enable CORS for your Next.js app

@app.route('/api/festivals/year/<year>', methods=['GET'])
def get_festivals_by_year(year):
    """Get all festivals for a specific year"""
    try:
        fest = IndianFestivals(str(year))
        festivals_json = fest.get_festivals_in_a_year()
        festivals_dict = json.loads(festivals_json)
        
        # Convert dict format to list format for easier consumption
        all_festivals = []
        for month, festivals in festivals_dict.items():
            for festival in festivals:
                festival['month'] = month
                # Create a full date string (YYYY-MM-DD format)
                try:
                    month_num = datetime.strptime(month, '%B').month
                    date_str = f"{year}-{month_num:02d}-{festival['date'].zfill(2)}"
                    festival['full_date'] = date_str
                except:
                    festival['full_date'] = None
                all_festivals.append(festival)
        
        return jsonify({
            'success': True,
            'year': year,
            'festivals': all_festivals,
            'count': len(all_festivals)
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/festivals/month', methods=['GET'])
def get_festivals_by_month():
    """Get festivals for a specific month and year"""
    year = request.args.get('year', str(datetime.now().year))
    month = request.args.get('month')
    
    if not month:
        return jsonify({
            'success': False,
            'error': 'Month parameter is required (1-12)'
        }), 400
    
    try:
        fest = IndianFestivals(str(year))
        festivals_json = fest.get_festivals_in_a_month(str(month))
        festivals = json.loads(festivals_json)
        
        # Add full date to each festival
        for festival in festivals:
            try:
                month_num = int(month)
                date_str = f"{year}-{month_num:02d}-{festival['date'].zfill(2)}"
                festival['full_date'] = date_str
            except:
                festival['full_date'] = None
        
        return jsonify({
            'success': True,
            'year': year,
            'month': month,
            'festivals': festivals,
            'count': len(festivals) if isinstance(festivals, list) else 0
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/festivals/date/<date>', methods=['GET'])
def get_festivals_by_date(date):
    """Get festivals for a specific date (YYYY-MM-DD)"""
    try:
        # Parse date
        date_obj = datetime.strptime(date, '%Y-%m-%d')
        year = str(date_obj.year)
        month = str(date_obj.month)
        day = str(date_obj.day)
        
        fest = IndianFestivals(year)
        festivals_json = fest.get_festivals_in_a_month(month)
        month_festivals = json.loads(festivals_json)
        
        # Filter festivals for the specific date
        date_festivals = []
        if isinstance(month_festivals, list):
            for festival in month_festivals:
                # Check if festival matches the date
                festival_day = festival.get('date', '').strip()
                if festival_day == day:
                    festival['full_date'] = date
                    date_festivals.append(festival)
        
        return jsonify({
            'success': True,
            'date': date,
            'festivals': date_festivals,
            'count': len(date_festivals)
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/festivals/search', methods=['GET'])
def search_festivals():
    """Search festivals by name across a year"""
    year = request.args.get('year', str(datetime.now().year))
    query = request.args.get('q', '').lower()
    
    if not query:
        return jsonify({
            'success': False,
            'error': 'Search query (q) parameter is required'
        }), 400
    
    try:
        fest = IndianFestivals(str(year))
        festivals_json = fest.get_festivals_in_a_year()
        festivals_dict = json.loads(festivals_json)
        
        # Search across all festivals
        matching_festivals = []
        for month, festivals in festivals_dict.items():
            for festival in festivals:
                festival_name = str(festival.get('name', '')).lower()
                if query in festival_name:
                    festival['month'] = month
                    try:
                        month_num = datetime.strptime(month, '%B').month
                        date_str = f"{year}-{month_num:02d}-{festival['date'].zfill(2)}"
                        festival['full_date'] = date_str
                    except:
                        festival['full_date'] = None
                    matching_festivals.append(festival)
        
        return jsonify({
            'success': True,
            'year': year,
            'query': query,
            'festivals': matching_festivals,
            'count': len(matching_festivals)
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/festivals/religious/year/<year>', methods=['GET'])
def get_religious_festivals_by_year(year):
    """Get all religious festivals for a specific year"""
    try:
        fest = IndianFestivals(str(year))
        festivals_json = fest.get_religious_festivals_in_a_year()
        festivals_dict = json.loads(festivals_json)
        
        # Convert dict format to list format
        all_festivals = []
        for month, festivals in festivals_dict.items():
            for festival in festivals:
                festival['month'] = month
                try:
                    month_num = datetime.strptime(month, '%B').month
                    date_str = f"{year}-{month_num:02d}-{festival['date'].zfill(2)}"
                    festival['full_date'] = date_str
                except:
                    festival['full_date'] = None
                all_festivals.append(festival)
        
        return jsonify({
            'success': True,
            'year': year,
            'festivals': all_festivals,
            'count': len(all_festivals)
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/festivals/religious/month', methods=['GET'])
def get_religious_festivals_by_month():
    """Get religious festivals for a specific month and year"""
    year = request.args.get('year', str(datetime.now().year))
    month = request.args.get('month')
    
    if not month:
        return jsonify({
            'success': False,
            'error': 'Month parameter is required (1-12)'
        }), 400
    
    try:
        fest = IndianFestivals(str(year))
        festivals_json = fest.get_religious_festivals_in_a_month(str(month))
        festivals = json.loads(festivals_json)
        
        # Add full date to each festival
        for festival in festivals:
            try:
                month_num = int(month)
                date_str = f"{year}-{month_num:02d}-{festival['date'].zfill(2)}"
                festival['full_date'] = date_str
            except:
                festival['full_date'] = None
        
        return jsonify({
            'success': True,
            'year': year,
            'month': month,
            'festivals': festivals,
            'count': len(festivals) if isinstance(festivals, list) else 0
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'ok',
        'service': 'indian_festivals_api',
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

