#!/usr/bin/env python3
"""
Script to inspect the indian_festivals package API structure
Run this to understand the exact API before integration
"""

# Workaround: Import directly from festival.py due to package bug
import sys
import os
import importlib.util

# Load the festival module directly
festival_path = os.path.join(os.path.dirname(__file__), 'venv/lib/python3.13/site-packages/indian_festivals/festival.py')
spec = importlib.util.spec_from_file_location("festival", festival_path)
festival_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(festival_module)
IndianFestivals = festival_module.IndianFestivals

import json

print("=" * 60)
print("INDIAN_FESTIVALS PACKAGE INSPECTION")
print("=" * 60)

# Check package structure
print("\n1. Package structure:")
print(f"   Festival module location: {festival_path}")

# Check IndianFestivals class
print("\n2. IndianFestivals class methods:")
print(f"   Available methods: {[m for m in dir(IndianFestivals) if not m.startswith('_')]}")

# Test with a sample year
print("\n3. Testing with year 2025:")
try:
    fest = IndianFestivals("2025")
    
    # Test get_festivals_in_a_year
    print("\n   Testing get_festivals_in_a_year():")
    year_festivals_str = fest.get_festivals_in_a_year()
    print(f"   Return type: {type(year_festivals_str)}")
    year_festivals = json.loads(year_festivals_str)
    print(f"   Parsed type: {type(year_festivals)}")
    if isinstance(year_festivals, dict):
        print(f"   Keys (months): {list(year_festivals.keys())[:3]}...")  # First 3 months
        # Show sample from first month
        first_month = list(year_festivals.keys())[0]
        if year_festivals[first_month]:
            print(f"   Sample festival from {first_month}:")
            print(f"   {json.dumps(year_festivals[first_month][0], indent=6, ensure_ascii=False)}")
    
    # Test get_festivals_in_a_month
    print("\n   Testing get_festivals_in_a_month('1'):")
    month_festivals_str = fest.get_festivals_in_a_month("1")
    print(f"   Return type: {type(month_festivals_str)}")
    month_festivals = json.loads(month_festivals_str)
    print(f"   Parsed type: {type(month_festivals)}")
    print(f"   Count: {len(month_festivals) if isinstance(month_festivals, list) else 'N/A'}")
    if isinstance(month_festivals, list) and month_festivals:
        print(f"   Sample festival structure:")
        print(f"   {json.dumps(month_festivals[0], indent=6, ensure_ascii=False)}")
    elif isinstance(month_festivals, dict):
        print(f"   Dictionary structure:")
        print(f"   Keys: {list(month_festivals.keys())}")
        if month_festivals:
            first_key = list(month_festivals.keys())[0]
            if month_festivals[first_key]:
                print(f"   Sample from {first_key}:")
                print(f"   {json.dumps(month_festivals[first_key][0], indent=6, ensure_ascii=False)}")
    
    # Check if there are other methods
    print("\n4. Checking for additional methods:")
    methods = [m for m in dir(fest) if not m.startswith('_') and callable(getattr(fest, m))]
    for method in methods:
        print(f"   - {method}")
        
except Exception as e:
    print(f"\n   ERROR: {e}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 60)
print("INSPECTION COMPLETE")
print("=" * 60)

