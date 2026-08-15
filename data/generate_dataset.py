import csv
import json
import random

CARS_DATA = [
    # Toyota
    {"id": 1, "brand": "Toyota", "model": "RAV4 Hybrid", "year": 2023, "price": 31500, "mileage": 12000, "fuel_type": "Hybrid", "transmission": "CVT", "body_type": "SUV", "engine_cc": 2500, "horsepower": 219, "seats": 5, "drive_type": "AWD", "city": "Dallas", "condition": "Like New", "rating": 4.8, "fuel_economy": 40, "usage": "Family", "luxury_score": 6, "reliability_score": 10},
    {"id": 2, "brand": "Toyota", "model": "Camry LE", "year": 2022, "price": 24800, "mileage": 28000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Sedan", "engine_cc": 2500, "horsepower": 203, "seats": 5, "drive_type": "FWD", "city": "Austin", "condition": "Used", "rating": 4.7, "fuel_economy": 32, "usage": "Daily Commute", "luxury_score": 5, "reliability_score": 10},
    {"id": 3, "brand": "Toyota", "model": "Corolla Hybrid", "year": 2023, "price": 23000, "mileage": 15000, "fuel_type": "Hybrid", "transmission": "CVT", "body_type": "Sedan", "engine_cc": 1800, "horsepower": 138, "seats": 5, "drive_type": "FWD", "city": "Houston", "condition": "Like New", "rating": 4.7, "fuel_economy": 50, "usage": "Daily Commute", "luxury_score": 4, "reliability_score": 10},
    {"id": 4, "brand": "Toyota", "model": "Highlander Hybrid", "year": 2023, "price": 42500, "mileage": 19000, "fuel_type": "Hybrid", "transmission": "CVT", "body_type": "SUV", "engine_cc": 2500, "horsepower": 243, "seats": 7, "drive_type": "AWD", "city": "Denver", "condition": "Like New", "rating": 4.8, "fuel_economy": 36, "usage": "Family", "luxury_score": 7, "reliability_score": 9},
    {"id": 5, "brand": "Toyota", "model": "Tacoma TRD Off-Road", "year": 2022, "price": 38500, "mileage": 32000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Pickup", "engine_cc": 3500, "horsepower": 278, "seats": 5, "drive_type": "4WD", "city": "Phoenix", "condition": "Used", "rating": 4.6, "fuel_economy": 20, "usage": "Off-road", "luxury_score": 5, "reliability_score": 9},
    {"id": 6, "brand": "Toyota", "model": "GR Supra 3.0", "year": 2023, "price": 54000, "mileage": 8000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Coupe", "engine_cc": 3000, "horsepower": 382, "seats": 2, "drive_type": "RWD", "city": "Los Angeles", "condition": "Like New", "rating": 4.7, "fuel_economy": 25, "usage": "Performance", "luxury_score": 7, "reliability_score": 8},
    {"id": 7, "brand": "Toyota", "model": "Sienna Platinum Hybrid", "year": 2023, "price": 49000, "mileage": 14000, "fuel_type": "Hybrid", "transmission": "CVT", "body_type": "Minivan", "engine_cc": 2500, "horsepower": 245, "seats": 8, "drive_type": "AWD", "city": "Chicago", "condition": "Like New", "rating": 4.8, "fuel_economy": 36, "usage": "Family", "luxury_score": 7, "reliability_score": 10},
    {"id": 8, "brand": "Toyota", "model": "Prius Prime", "year": 2023, "price": 32500, "mileage": 9500, "fuel_type": "Hybrid", "transmission": "CVT", "body_type": "Hatchback", "engine_cc": 2000, "horsepower": 220, "seats": 5, "drive_type": "FWD", "city": "San Francisco", "condition": "Like New", "rating": 4.8, "fuel_economy": 52, "usage": "Daily Commute", "luxury_score": 6, "reliability_score": 10},

    # Honda
    {"id": 9, "brand": "Honda", "model": "CR-V Hybrid", "year": 2023, "price": 33800, "mileage": 14000, "fuel_type": "Hybrid", "transmission": "CVT", "body_type": "SUV", "engine_cc": 2000, "horsepower": 204, "seats": 5, "drive_type": "AWD", "city": "Seattle", "condition": "Like New", "rating": 4.8, "fuel_economy": 40, "usage": "Family", "luxury_score": 6, "reliability_score": 10},
    {"id": 10, "brand": "Honda", "model": "Civic Sport", "year": 2022, "price": 23500, "mileage": 22000, "fuel_type": "Petrol", "transmission": "CVT", "body_type": "Sedan", "engine_cc": 2000, "horsepower": 158, "seats": 5, "drive_type": "FWD", "city": "San Diego", "condition": "Used", "rating": 4.7, "fuel_economy": 33, "usage": "Daily Commute", "luxury_score": 5, "reliability_score": 9},
    {"id": 11, "brand": "Honda", "model": "Accord Hybrid Touring", "year": 2023, "price": 36500, "mileage": 11000, "fuel_type": "Hybrid", "transmission": "CVT", "body_type": "Sedan", "engine_cc": 2000, "horsepower": 204, "seats": 5, "drive_type": "FWD", "city": "Atlanta", "condition": "Like New", "rating": 4.8, "fuel_economy": 46, "usage": "Business", "luxury_score": 7, "reliability_score": 9},
    {"id": 12, "brand": "Honda", "model": "Pilot Elite", "year": 2023, "price": 48500, "mileage": 16000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 3500, "horsepower": 285, "seats": 8, "drive_type": "AWD", "city": "Dallas", "condition": "Like New", "rating": 4.7, "fuel_economy": 21, "usage": "Family", "luxury_score": 7, "reliability_score": 9},
    {"id": 13, "brand": "Honda", "model": "Civic Type R", "year": 2023, "price": 44500, "mileage": 7000, "fuel_type": "Petrol", "transmission": "Manual", "body_type": "Hatchback", "engine_cc": 2000, "horsepower": 315, "seats": 4, "drive_type": "FWD", "city": "Miami", "condition": "Like New", "rating": 4.9, "fuel_economy": 24, "usage": "Performance", "luxury_score": 6, "reliability_score": 9},
    {"id": 14, "brand": "Honda", "model": "Odyssey Touring", "year": 2022, "price": 41000, "mileage": 30000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Minivan", "engine_cc": 3500, "horsepower": 280, "seats": 8, "drive_type": "FWD", "city": "Orlando", "condition": "Used", "rating": 4.6, "fuel_economy": 22, "usage": "Family", "luxury_score": 6, "reliability_score": 9},

    # BMW
    {"id": 15, "brand": "BMW", "model": "330i xDrive", "year": 2023, "price": 45000, "mileage": 14000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Sedan", "engine_cc": 2000, "horsepower": 255, "seats": 5, "drive_type": "AWD", "city": "New York", "condition": "Like New", "rating": 4.8, "fuel_economy": 28, "usage": "Luxury", "luxury_score": 9, "reliability_score": 7},
    {"id": 16, "brand": "BMW", "model": "X5 xDrive40i", "year": 2022, "price": 58500, "mileage": 24000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 3000, "horsepower": 335, "seats": 5, "drive_type": "AWD", "city": "Boston", "condition": "Used", "rating": 4.7, "fuel_economy": 23, "usage": "Luxury", "luxury_score": 9, "reliability_score": 7},
    {"id": 17, "brand": "BMW", "model": "M4 Competition", "year": 2023, "price": 79000, "mileage": 9000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Coupe", "engine_cc": 3000, "horsepower": 503, "seats": 4, "drive_type": "AWD", "city": "Las Vegas", "condition": "Like New", "rating": 4.9, "fuel_economy": 19, "usage": "Performance", "luxury_score": 9, "reliability_score": 7},
    {"id": 18, "brand": "BMW", "model": "i4 eDrive40", "year": 2023, "price": 53000, "mileage": 11000, "fuel_type": "Electric", "transmission": "Automatic", "body_type": "Sedan", "engine_cc": 0, "horsepower": 335, "seats": 5, "drive_type": "RWD", "city": "San Jose", "condition": "Like New", "rating": 4.8, "fuel_economy": 109, "usage": "Daily Commute", "luxury_score": 9, "reliability_score": 8},
    {"id": 19, "brand": "BMW", "model": "X3 sDrive30i", "year": 2022, "price": 39800, "mileage": 26000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 2000, "horsepower": 248, "seats": 5, "drive_type": "RWD", "city": "Philadelphia", "condition": "Used", "rating": 4.6, "fuel_economy": 25, "usage": "Daily Commute", "luxury_score": 8, "reliability_score": 7},
    {"id": 20, "brand": "BMW", "model": "M2 Coupe", "year": 2023, "price": 63500, "mileage": 6000, "fuel_type": "Petrol", "transmission": "Manual", "body_type": "Coupe", "engine_cc": 3000, "horsepower": 453, "seats": 4, "drive_type": "RWD", "city": "Charlotte", "condition": "Like New", "rating": 4.9, "fuel_economy": 19, "usage": "Performance", "luxury_score": 8, "reliability_score": 7},

    # Mercedes-Benz
    {"id": 21, "brand": "Mercedes", "model": "C300 4MATIC", "year": 2023, "price": 46500, "mileage": 13000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Sedan", "engine_cc": 2000, "horsepower": 255, "seats": 5, "drive_type": "AWD", "city": "Miami", "condition": "Like New", "rating": 4.7, "fuel_economy": 27, "usage": "Luxury", "luxury_score": 9, "reliability_score": 7},
    {"id": 22, "brand": "Mercedes", "model": "GLE 350", "year": 2022, "price": 54000, "mileage": 29000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 2000, "horsepower": 255, "seats": 5, "drive_type": "AWD", "city": "Houston", "condition": "Used", "rating": 4.7, "fuel_economy": 22, "usage": "Luxury", "luxury_score": 9, "reliability_score": 7},
    {"id": 23, "brand": "Mercedes", "model": "EQE 350+ Sedan", "year": 2023, "price": 68000, "mileage": 10000, "fuel_type": "Electric", "transmission": "Automatic", "body_type": "Sedan", "engine_cc": 0, "horsepower": 288, "seats": 5, "drive_type": "RWD", "city": "San Francisco", "condition": "Like New", "rating": 4.7, "fuel_economy": 96, "usage": "Business", "luxury_score": 10, "reliability_score": 8},
    {"id": 24, "brand": "Mercedes", "model": "AMG C43", "year": 2023, "price": 61000, "mileage": 9500, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Sedan", "engine_cc": 2000, "horsepower": 402, "seats": 5, "drive_type": "AWD", "city": "Los Angeles", "condition": "Like New", "rating": 4.8, "fuel_economy": 22, "usage": "Performance", "luxury_score": 9, "reliability_score": 7},
    {"id": 25, "brand": "Mercedes", "model": "GLA 250", "year": 2022, "price": 34500, "mileage": 25000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 2000, "horsepower": 221, "seats": 5, "drive_type": "FWD", "city": "Tampa", "condition": "Used", "rating": 4.5, "fuel_economy": 28, "usage": "Daily Commute", "luxury_score": 8, "reliability_score": 7},

    # Audi
    {"id": 26, "brand": "Audi", "model": "A4 45 TFSI quattro", "year": 2023, "price": 43500, "mileage": 16000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Sedan", "engine_cc": 2000, "horsepower": 261, "seats": 5, "drive_type": "AWD", "city": "Chicago", "condition": "Like New", "rating": 4.7, "fuel_economy": 27, "usage": "Luxury", "luxury_score": 9, "reliability_score": 7},
    {"id": 27, "brand": "Audi", "model": "Q5 45 TFSI", "year": 2022, "price": 41500, "mileage": 27000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 2000, "horsepower": 261, "seats": 5, "drive_type": "AWD", "city": "Denver", "condition": "Used", "rating": 4.6, "fuel_economy": 25, "usage": "Family", "luxury_score": 8, "reliability_score": 7},
    {"id": 28, "brand": "Audi", "model": "e-tron GT", "year": 2023, "price": 86000, "mileage": 8000, "fuel_type": "Electric", "transmission": "Automatic", "body_type": "Sedan", "engine_cc": 0, "horsepower": 522, "seats": 4, "drive_type": "AWD", "city": "Seattle", "condition": "Like New", "rating": 4.9, "fuel_economy": 82, "usage": "Performance", "luxury_score": 10, "reliability_score": 8},
    {"id": 29, "brand": "Audi", "model": "RS5 Sportback", "year": 2023, "price": 76500, "mileage": 11000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Hatchback", "engine_cc": 2900, "horsepower": 444, "seats": 5, "drive_type": "AWD", "city": "Scottsdale", "condition": "Like New", "rating": 4.8, "fuel_economy": 21, "usage": "Performance", "luxury_score": 9, "reliability_score": 7},
    {"id": 30, "brand": "Audi", "model": "Q7 55 TFSI", "year": 2022, "price": 55000, "mileage": 31000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 3000, "horsepower": 335, "seats": 7, "drive_type": "AWD", "city": "Minneapolis", "condition": "Used", "rating": 4.7, "fuel_economy": 20, "usage": "Family", "luxury_score": 9, "reliability_score": 7},

    # Hyundai & Kia
    {"id": 31, "brand": "Hyundai", "model": "Tucson Hybrid", "year": 2023, "price": 32000, "mileage": 14000, "fuel_type": "Hybrid", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 1600, "horsepower": 226, "seats": 5, "drive_type": "AWD", "city": "Dallas", "condition": "Like New", "rating": 4.7, "fuel_economy": 38, "usage": "Family", "luxury_score": 6, "reliability_score": 8},
    {"id": 32, "brand": "Hyundai", "model": "Elantra Hybrid", "year": 2022, "price": 22500, "mileage": 25000, "fuel_type": "Hybrid", "transmission": "Automatic", "body_type": "Sedan", "engine_cc": 1600, "horsepower": 139, "seats": 5, "drive_type": "FWD", "city": "San Antonio", "condition": "Used", "rating": 4.6, "fuel_economy": 52, "usage": "Daily Commute", "luxury_score": 5, "reliability_score": 8},
    {"id": 33, "brand": "Hyundai", "model": "IONIQ 5 Long Range", "year": 2023, "price": 43000, "mileage": 12000, "fuel_type": "Electric", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 0, "horsepower": 320, "seats": 5, "drive_type": "AWD", "city": "Portland", "condition": "Like New", "rating": 4.8, "fuel_economy": 110, "usage": "Daily Commute", "luxury_score": 7, "reliability_score": 8},
    {"id": 34, "brand": "Hyundai", "model": "Palisade Calligraphy", "year": 2023, "price": 47500, "mileage": 18000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 3800, "horsepower": 291, "seats": 7, "drive_type": "AWD", "city": "Nashville", "condition": "Like New", "rating": 4.8, "fuel_economy": 21, "usage": "Family", "luxury_score": 8, "reliability_score": 8},
    {"id": 35, "brand": "Kia", "model": "Sportage Hybrid", "year": 2023, "price": 31000, "mileage": 15000, "fuel_type": "Hybrid", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 1600, "horsepower": 227, "seats": 5, "drive_type": "AWD", "city": "Raleigh", "condition": "Like New", "rating": 4.7, "fuel_economy": 38, "usage": "Family", "luxury_score": 6, "reliability_score": 8},
    {"id": 36, "brand": "Kia", "model": "EV6 Wind AWD", "year": 2023, "price": 44500, "mileage": 13000, "fuel_type": "Electric", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 0, "horsepower": 320, "seats": 5, "drive_type": "AWD", "city": "Austin", "condition": "Like New", "rating": 4.8, "fuel_economy": 105, "usage": "Daily Commute", "luxury_score": 7, "reliability_score": 8},
    {"id": 37, "brand": "Kia", "model": "Telluride SX Prestige", "year": 2023, "price": 49500, "mileage": 19000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 3800, "horsepower": 291, "seats": 8, "drive_type": "AWD", "city": "Indianapolis", "condition": "Like New", "rating": 4.9, "fuel_economy": 21, "usage": "Family", "luxury_score": 8, "reliability_score": 8},
    {"id": 38, "brand": "Kia", "model": "Forte GT", "year": 2022, "price": 20500, "mileage": 27000, "fuel_type": "Petrol", "transmission": "Manual", "body_type": "Sedan", "engine_cc": 1600, "horsepower": 201, "seats": 5, "drive_type": "FWD", "city": "Columbus", "condition": "Used", "rating": 4.5, "fuel_economy": 30, "usage": "Daily Commute", "luxury_score": 4, "reliability_score": 8},

    # Ford
    {"id": 39, "brand": "Ford", "model": "F-150 Lariat SuperCrew", "year": 2022, "price": 51000, "mileage": 33000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Pickup", "engine_cc": 3500, "horsepower": 400, "seats": 5, "drive_type": "4WD", "city": "Fort Worth", "condition": "Used", "rating": 4.7, "fuel_economy": 20, "usage": "Off-road", "luxury_score": 7, "reliability_score": 8},
    {"id": 40, "brand": "Ford", "model": "Mustang GT Premium", "year": 2023, "price": 44000, "mileage": 11000, "fuel_type": "Petrol", "transmission": "Manual", "body_type": "Coupe", "engine_cc": 5000, "horsepower": 450, "seats": 4, "drive_type": "RWD", "city": "Detroit", "condition": "Like New", "rating": 4.8, "fuel_economy": 18, "usage": "Performance", "luxury_score": 6, "reliability_score": 8},
    {"id": 41, "brand": "Ford", "model": "Mustang Mach-E Premium", "year": 2023, "price": 46000, "mileage": 14000, "fuel_type": "Electric", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 0, "horsepower": 346, "seats": 5, "drive_type": "AWD", "city": "San Diego", "condition": "Like New", "rating": 4.7, "fuel_economy": 93, "usage": "Daily Commute", "luxury_score": 7, "reliability_score": 8},
    {"id": 42, "brand": "Ford", "model": "Explorer Limited", "year": 2022, "price": 38000, "mileage": 28000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 2300, "horsepower": 300, "seats": 7, "drive_type": "AWD", "city": "Kansas City", "condition": "Used", "rating": 4.5, "fuel_economy": 23, "usage": "Family", "luxury_score": 6, "reliability_score": 7},
    {"id": 43, "brand": "Ford", "model": "Maverick Hybrid", "year": 2023, "price": 27000, "mileage": 16000, "fuel_type": "Hybrid", "transmission": "CVT", "body_type": "Pickup", "engine_cc": 2500, "horsepower": 191, "seats": 5, "drive_type": "FWD", "city": "Salt Lake City", "condition": "Like New", "rating": 4.8, "fuel_economy": 37, "usage": "Daily Commute", "luxury_score": 4, "reliability_score": 8},
    {"id": 44, "brand": "Ford", "model": "Bronco Badlands", "year": 2023, "price": 52500, "mileage": 15000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 2700, "horsepower": 330, "seats": 5, "drive_type": "4WD", "city": "Boise", "condition": "Like New", "rating": 4.8, "fuel_economy": 17, "usage": "Off-road", "luxury_score": 6, "reliability_score": 7},

    # Tesla
    {"id": 45, "brand": "Tesla", "model": "Model 3 Long Range", "year": 2023, "price": 39500, "mileage": 15000, "fuel_type": "Electric", "transmission": "Automatic", "body_type": "Sedan", "engine_cc": 0, "horsepower": 358, "seats": 5, "drive_type": "AWD", "city": "San Francisco", "condition": "Like New", "rating": 4.8, "fuel_economy": 131, "usage": "Daily Commute", "luxury_score": 8, "reliability_score": 8},
    {"id": 46, "brand": "Tesla", "model": "Model Y Long Range", "year": 2023, "price": 44000, "mileage": 17000, "fuel_type": "Electric", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 0, "horsepower": 384, "seats": 5, "drive_type": "AWD", "city": "Los Angeles", "condition": "Like New", "rating": 4.8, "fuel_economy": 122, "usage": "Family", "luxury_score": 8, "reliability_score": 8},
    {"id": 47, "brand": "Tesla", "model": "Model S Plaid", "year": 2023, "price": 89000, "mileage": 10000, "fuel_type": "Electric", "transmission": "Automatic", "body_type": "Sedan", "engine_cc": 0, "horsepower": 1020, "seats": 5, "drive_type": "AWD", "city": "Miami", "condition": "Like New", "rating": 4.9, "fuel_economy": 116, "usage": "Performance", "luxury_score": 9, "reliability_score": 8},
    {"id": 48, "brand": "Tesla", "model": "Model X Long Range", "year": 2022, "price": 74000, "mileage": 22000, "fuel_type": "Electric", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 0, "horsepower": 670, "seats": 7, "drive_type": "AWD", "city": "Seattle", "condition": "Used", "rating": 4.7, "fuel_economy": 102, "usage": "Luxury", "luxury_score": 9, "reliability_score": 7},

    # Lexus
    {"id": 49, "brand": "Lexus", "model": "RX 350 Premium", "year": 2023, "price": 51500, "mileage": 14000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 2400, "horsepower": 275, "seats": 5, "drive_type": "AWD", "city": "Dallas", "condition": "Like New", "rating": 4.9, "fuel_economy": 24, "usage": "Luxury", "luxury_score": 9, "reliability_score": 10},
    {"id": 50, "brand": "Lexus", "model": "NX 350h Luxury", "year": 2023, "price": 47000, "mileage": 12000, "fuel_type": "Hybrid", "transmission": "CVT", "body_type": "SUV", "engine_cc": 2500, "horsepower": 240, "seats": 5, "drive_type": "AWD", "city": "Phoenix", "condition": "Like New", "rating": 4.9, "fuel_economy": 39, "usage": "Family", "luxury_score": 9, "reliability_score": 10},
    {"id": 51, "brand": "Lexus", "model": "ES 300h Ultra Luxury", "year": 2023, "price": 46000, "mileage": 16000, "fuel_type": "Hybrid", "transmission": "CVT", "body_type": "Sedan", "engine_cc": 2500, "horsepower": 215, "seats": 5, "drive_type": "FWD", "city": "Atlanta", "condition": "Like New", "rating": 4.9, "fuel_economy": 44, "usage": "Business", "luxury_score": 9, "reliability_score": 10},
    {"id": 52, "brand": "Lexus", "model": "LC 500 Convertible", "year": 2022, "price": 94000, "mileage": 9000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Convertible", "engine_cc": 5000, "horsepower": 471, "seats": 4, "drive_type": "RWD", "city": "Beverly Hills", "condition": "Like New", "rating": 4.9, "fuel_economy": 18, "usage": "Luxury", "luxury_score": 10, "reliability_score": 9},
    {"id": 53, "brand": "Lexus", "model": "GX 460 Luxury", "year": 2022, "price": 56000, "mileage": 28000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 4600, "horsepower": 301, "seats": 7, "drive_type": "4WD", "city": "Houston", "condition": "Used", "rating": 4.8, "fuel_economy": 16, "usage": "Off-road", "luxury_score": 9, "reliability_score": 10},

    # Nissan & Suzuki & Subaru & Mazda & Porsche
    {"id": 54, "brand": "Nissan", "model": "Rogue SV", "year": 2023, "price": 27500, "mileage": 20000, "fuel_type": "Petrol", "transmission": "CVT", "body_type": "SUV", "engine_cc": 1500, "horsepower": 201, "seats": 5, "drive_type": "AWD", "city": "Cleveland", "condition": "Like New", "rating": 4.5, "fuel_economy": 31, "usage": "Family", "luxury_score": 5, "reliability_score": 7},
    {"id": 55, "brand": "Nissan", "model": "Altima SR", "year": 2022, "price": 21800, "mileage": 34000, "fuel_type": "Petrol", "transmission": "CVT", "body_type": "Sedan", "engine_cc": 2500, "horsepower": 188, "seats": 5, "drive_type": "FWD", "city": "Memphis", "condition": "Used", "rating": 4.4, "fuel_economy": 32, "usage": "Daily Commute", "luxury_score": 5, "reliability_score": 7},
    {"id": 56, "brand": "Nissan", "model": "Z Performance", "year": 2023, "price": 49000, "mileage": 8500, "fuel_type": "Petrol", "transmission": "Manual", "body_type": "Coupe", "engine_cc": 3000, "horsepower": 400, "seats": 2, "drive_type": "RWD", "city": "San Antonio", "condition": "Like New", "rating": 4.7, "fuel_economy": 20, "usage": "Performance", "luxury_score": 7, "reliability_score": 8},
    {"id": 57, "brand": "Nissan", "model": "Ariya Evolve+", "year": 2023, "price": 41000, "mileage": 12000, "fuel_type": "Electric", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 0, "horsepower": 238, "seats": 5, "drive_type": "FWD", "city": "Denver", "condition": "Like New", "rating": 4.6, "fuel_economy": 98, "usage": "Daily Commute", "luxury_score": 7, "reliability_score": 8},

    {"id": 58, "brand": "Suzuki", "model": "Jimny AllGrip Pro", "year": 2023, "price": 24000, "mileage": 11000, "fuel_type": "Petrol", "transmission": "Manual", "body_type": "SUV", "engine_cc": 1500, "horsepower": 101, "seats": 4, "drive_type": "4WD", "city": "Tucson", "condition": "Like New", "rating": 4.8, "fuel_economy": 34, "usage": "Off-road", "luxury_score": 4, "reliability_score": 9},
    {"id": 59, "brand": "Suzuki", "model": "Swift Sport Boosterjet", "year": 2022, "price": 18500, "mileage": 22000, "fuel_type": "Hybrid", "transmission": "Manual", "body_type": "Hatchback", "engine_cc": 1400, "horsepower": 129, "seats": 5, "drive_type": "FWD", "city": "El Paso", "condition": "Used", "rating": 4.6, "fuel_economy": 45, "usage": "Daily Commute", "luxury_score": 4, "reliability_score": 9},
    {"id": 60, "brand": "Suzuki", "model": "Vitara Hybrid", "year": 2023, "price": 26000, "mileage": 16000, "fuel_type": "Hybrid", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 1400, "horsepower": 127, "seats": 5, "drive_type": "AWD", "city": "Albuquerque", "condition": "Like New", "rating": 4.6, "fuel_economy": 42, "usage": "Family", "luxury_score": 5, "reliability_score": 9},

    {"id": 61, "brand": "Subaru", "model": "Outback Touring XT", "year": 2023, "price": 39500, "mileage": 17000, "fuel_type": "Petrol", "transmission": "CVT", "body_type": "Wagon", "engine_cc": 2400, "horsepower": 260, "seats": 5, "drive_type": "AWD", "city": "Boulder", "condition": "Like New", "rating": 4.8, "fuel_economy": 26, "usage": "Off-road", "luxury_score": 7, "reliability_score": 9},
    {"id": 62, "brand": "Subaru", "model": "Crosstrek Premium", "year": 2023, "price": 26500, "mileage": 19000, "fuel_type": "Petrol", "transmission": "CVT", "body_type": "SUV", "engine_cc": 2000, "horsepower": 152, "seats": 5, "drive_type": "AWD", "city": "Portland", "condition": "Like New", "rating": 4.7, "fuel_economy": 30, "usage": "Daily Commute", "luxury_score": 5, "reliability_score": 9},
    {"id": 63, "brand": "Subaru", "model": "WRX Limited", "year": 2023, "price": 36000, "mileage": 12000, "fuel_type": "Petrol", "transmission": "Manual", "body_type": "Sedan", "engine_cc": 2400, "horsepower": 271, "seats": 5, "drive_type": "AWD", "city": "Seattle", "condition": "Like New", "rating": 4.7, "fuel_economy": 22, "usage": "Performance", "luxury_score": 6, "reliability_score": 8},

    {"id": 64, "brand": "Mazda", "model": "CX-50 2.5 Turbo", "year": 2023, "price": 37500, "mileage": 14000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 2500, "horsepower": 256, "seats": 5, "drive_type": "AWD", "city": "Austin", "condition": "Like New", "rating": 4.8, "fuel_economy": 25, "usage": "Family", "luxury_score": 7, "reliability_score": 9},
    {"id": 65, "brand": "Mazda", "model": "MX-5 Miata Club", "year": 2023, "price": 31500, "mileage": 7500, "fuel_type": "Petrol", "transmission": "Manual", "body_type": "Convertible", "engine_cc": 2000, "horsepower": 181, "seats": 2, "drive_type": "RWD", "city": "San Diego", "condition": "Like New", "rating": 4.9, "fuel_economy": 29, "usage": "Performance", "luxury_score": 6, "reliability_score": 9},
    {"id": 66, "brand": "Mazda", "model": "Mazda3 Turbo Premium Plus", "year": 2022, "price": 29000, "mileage": 21000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Hatchback", "engine_cc": 2500, "horsepower": 250, "seats": 5, "drive_type": "AWD", "city": "Chicago", "condition": "Used", "rating": 4.7, "fuel_economy": 27, "usage": "Daily Commute", "luxury_score": 7, "reliability_score": 9},

    {"id": 67, "brand": "Porsche", "model": "911 Carrera S", "year": 2022, "price": 128000, "mileage": 11000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Coupe", "engine_cc": 3000, "horsepower": 443, "seats": 4, "drive_type": "RWD", "city": "Newport Beach", "condition": "Like New", "rating": 4.9, "fuel_economy": 20, "usage": "Performance", "luxury_score": 10, "reliability_score": 9},
    {"id": 68, "brand": "Porsche", "model": "Macan GTS", "year": 2023, "price": 84000, "mileage": 9500, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 2900, "horsepower": 434, "seats": 5, "drive_type": "AWD", "city": "Greenwich", "condition": "Like New", "rating": 4.9, "fuel_economy": 19, "usage": "Luxury", "luxury_score": 10, "reliability_score": 8},
    {"id": 69, "brand": "Porsche", "model": "Taycan 4S", "year": 2023, "price": 102000, "mileage": 8500, "fuel_type": "Electric", "transmission": "Automatic", "body_type": "Sedan", "engine_cc": 0, "horsepower": 522, "seats": 4, "drive_type": "AWD", "city": "San Francisco", "condition": "Like New", "rating": 4.9, "fuel_economy": 82, "usage": "Luxury", "luxury_score": 10, "reliability_score": 8},

    # Additional diverse realistic cars (to reach 180 total records)
]

# Function to expand realistic records programmatically with systematic variation
def build_full_dataset():
    data = list(CARS_DATA)
    extra_cars = [
        ("Toyota", "RAV4 XLE", 2022, 27500, 31000, "Petrol", "Automatic", "SUV", 2500, 203, 5, "FWD", "Houston", "Used", 4.7, 30, "Family", 5, 10),
        ("Toyota", "Camry Hybrid XLE", 2023, 33000, 11000, "Hybrid", "CVT", "Sedan", 2500, 208, 5, "FWD", "Tampa", "Like New", 4.8, 46, "Daily Commute", 6, 10),
        ("Toyota", "4Runner TRD Pro", 2022, 51000, 29000, "Petrol", "Automatic", "SUV", 4000, 270, 5, "4WD", "Denver", "Used", 4.8, 17, "Off-road", 6, 10),
        ("Toyota", "Venza Limited", 2023, 41500, 14000, "Hybrid", "CVT", "SUV", 2500, 219, 5, "AWD", "San Jose", "Like New", 4.8, 39, "Luxury", 8, 10),
        ("Toyota", "Tundra Platinum", 2023, 62000, 16000, "Hybrid", "Automatic", "Pickup", 3400, 437, 5, "4WD", "Dallas", "Like New", 4.7, 20, "Off-road", 8, 9),
        ("Toyota", "Yaris Cross", 2022, 19500, 24000, "Hybrid", "CVT", "SUV", 1500, 116, 5, "FWD", "San Antonio", "Used", 4.6, 48, "Daily Commute", 4, 10),
        
        ("Honda", "Accord Sport 2.0T", 2022, 29500, 26000, "Petrol", "Automatic", "Sedan", 2000, 252, 5, "FWD", "Orlando", "Used", 4.8, 26, "Performance", 6, 9),
        ("Honda", "HR-V EX-L", 2023, 28000, 15000, "Petrol", "CVT", "SUV", 2000, 158, 5, "AWD", "Jacksonville", "Like New", 4.6, 28, "Daily Commute", 5, 9),
        ("Honda", "Passport Trailsport", 2023, 42000, 17000, "Petrol", "Automatic", "SUV", 3500, 280, 5, "AWD", "Salt Lake City", "Like New", 4.7, 21, "Off-road", 6, 9),
        ("Honda", "Ridgeline RTL-E", 2023, 41500, 18000, "Petrol", "Automatic", "Pickup", 3500, 280, 5, "AWD", "Phoenix", "Like New", 4.7, 21, "Family", 6, 9),
        ("Honda", "Civic Si", 2023, 29000, 12000, "Petrol", "Manual", "Sedan", 1500, 200, 5, "FWD", "Charlotte", "Like New", 4.8, 31, "Performance", 5, 9),

        ("BMW", "530i M Sport", 2023, 56000, 13000, "Petrol", "Automatic", "Sedan", 2000, 248, 5, "RWD", "Atlanta", "Like New", 4.8, 27, "Business", 9, 8),
        ("BMW", "X7 xDrive40i", 2023, 79500, 14000, "Petrol", "Automatic", "SUV", 3000, 375, 7, "AWD", "Dallas", "Like New", 4.8, 22, "Luxury", 10, 8),
        ("BMW", "M340i xDrive", 2023, 57000, 11000, "Petrol", "Automatic", "Sedan", 3000, 382, 5, "AWD", "Miami", "Like New", 4.9, 26, "Performance", 8, 8),
        ("BMW", "iX xDrive50", 2023, 82000, 10000, "Electric", "Automatic", "SUV", 0, 516, 5, "AWD", "Los Angeles", "Like New", 4.8, 86, "Luxury", 10, 8),
        ("BMW", "Z4 sDrive M40i", 2023, 64000, 7000, "Petrol", "Automatic", "Convertible", 3000, 382, 2, "RWD", "Scottsdale", "Like New", 4.8, 26, "Performance", 8, 8),
        ("BMW", "X1 xDrive28i", 2023, 38500, 16000, "Petrol", "Automatic", "SUV", 2000, 241, 5, "AWD", "Philadelphia", "Like New", 4.6, 28, "Daily Commute", 8, 8),

        ("Mercedes", "E350 4MATIC", 2023, 58000, 12000, "Petrol", "Automatic", "Sedan", 2000, 255, 5, "AWD", "Washington", "Like New", 4.8, 26, "Business", 10, 8),
        ("Mercedes", "GLC 300 4MATIC", 2023, 48500, 15000, "Petrol", "Automatic", "SUV", 2000, 255, 5, "AWD", "Houston", "Like New", 4.8, 26, "Luxury", 9, 8),
        ("Mercedes", "S580 4MATIC", 2022, 108000, 19000, "Petrol", "Automatic", "Sedan", 4000, 496, 5, "AWD", "Beverly Hills", "Used", 4.9, 21, "Luxury", 10, 8),
        ("Mercedes", "EQB 300 4MATIC", 2023, 51000, 14000, "Electric", "Automatic", "SUV", 0, 225, 7, "AWD", "San Francisco", "Like New", 4.6, 98, "Family", 8, 8),
        ("Mercedes", "AMG GT Coupe", 2022, 115000, 10000, "Petrol", "Automatic", "Coupe", 4000, 523, 2, "RWD", "Las Vegas", "Used", 4.9, 17, "Performance", 10, 8),
        ("Mercedes", "GLS 450", 2023, 83000, 16000, "Petrol", "Automatic", "SUV", 3000, 362, 7, "AWD", "New York", "Like New", 4.8, 20, "Family", 10, 8),

        ("Audi", "A6 55 TFSI", 2023, 59000, 13000, "Petrol", "Automatic", "Sedan", 3000, 335, 5, "AWD", "Boston", "Like New", 4.8, 24, "Business", 9, 8),
        ("Audi", "Q8 55 TFSI", 2023, 72000, 15000, "Petrol", "Automatic", "SUV", 3000, 335, 5, "AWD", "Miami", "Like New", 4.8, 20, "Luxury", 9, 8),
        ("Audi", "S3 Premium Plus", 2023, 47000, 11000, "Petrol", "Automatic", "Sedan", 2000, 306, 5, "AWD", "Chicago", "Like New", 4.8, 27, "Performance", 8, 8),
        ("Audi", "Q3 45 TFSI", 2022, 35000, 26000, "Petrol", "Automatic", "SUV", 2000, 228, 5, "AWD", "Pittsburgh", "Used", 4.6, 25, "Daily Commute", 7, 8),
        ("Audi", "TT RS Coupe", 2022, 69000, 12000, "Petrol", "Automatic", "Coupe", 2500, 394, 4, "AWD", "Denver", "Used", 4.9, 23, "Performance", 8, 8),
        ("Audi", "A4 Allroad", 2023, 47500, 14000, "Petrol", "Automatic", "Wagon", 2000, 261, 5, "AWD", "Seattle", "Like New", 4.8, 26, "Off-road", 8, 8),

        ("Ford", "F-150 Lightning EV", 2023, 56000, 11000, "Electric", "Automatic", "Pickup", 0, 452, 5, "AWD", "Detroit", "Like New", 4.7, 70, "Off-road", 7, 8),
        ("Ford", "Edge Titanium", 2022, 32000, 31000, "Petrol", "Automatic", "SUV", 2000, 250, 5, "AWD", "Cleveland", "Used", 4.5, 23, "Family", 6, 7),
        ("Ford", "Escape Plug-in Hybrid", 2023, 36500, 13000, "Hybrid", "CVT", "SUV", 2500, 210, 5, "FWD", "Minneapolis", "Like New", 4.6, 40, "Daily Commute", 5, 8),
        ("Ford", "Ranger Lariat 4x4", 2023, 41000, 16000, "Petrol", "Automatic", "Pickup", 2300, 270, 5, "4WD", "Dallas", "Like New", 4.6, 22, "Off-road", 6, 8),
        ("Ford", "Super Duty F-250 Diesel", 2022, 64000, 38000, "Diesel", "Automatic", "Pickup", 6700, 475, 5, "4WD", "San Antonio", "Used", 4.7, 16, "Off-road", 6, 9),

        ("Hyundai", "Ioniq 6 SEL", 2023, 41000, 10000, "Electric", "Automatic", "Sedan", 0, 225, 5, "RWD", "Atlanta", "Like New", 4.8, 140, "Daily Commute", 7, 9),
        ("Hyundai", "Santa Fe Hybrid", 2023, 38000, 15000, "Hybrid", "Automatic", "SUV", 1600, 226, 5, "AWD", "Nashville", "Like New", 4.7, 34, "Family", 7, 8),
        ("Hyundai", "Sonata N Line", 2022, 28000, 24000, "Petrol", "Automatic", "Sedan", 2500, 290, 5, "FWD", "Orlando", "Used", 4.7, 27, "Performance", 6, 8),
        ("Hyundai", "Kona Electric", 2023, 33500, 12000, "Electric", "Automatic", "SUV", 0, 201, 5, "FWD", "Portland", "Like New", 4.7, 120, "Daily Commute", 6, 8),
        ("Hyundai", "Santa Cruz Limited", 2023, 39000, 14000, "Petrol", "Automatic", "Pickup", 2500, 281, 5, "AWD", "Tampa", "Like New", 4.7, 22, "Family", 6, 8),

        ("Kia", "K5 GT", 2023, 31500, 15000, "Petrol", "Automatic", "Sedan", 2500, 290, 5, "FWD", "Phoenix", "Like New", 4.8, 27, "Performance", 6, 8),
        ("Kia", "Niro EV Wave", 2023, 39500, 11000, "Electric", "Automatic", "SUV", 0, 201, 5, "FWD", "San Diego", "Like New", 4.7, 113, "Daily Commute", 6, 8),
        ("Kia", "Sorento Hybrid EX", 2023, 37000, 17000, "Hybrid", "Automatic", "SUV", 1600, 227, 6, "AWD", "Indianapolis", "Like New", 4.7, 37, "Family", 7, 8),
        ("Kia", "Carnival SX Prestige", 2023, 46000, 18000, "Petrol", "Automatic", "Minivan", 3500, 290, 7, "FWD", "Dallas", "Like New", 4.8, 22, "Family", 8, 8),
        ("Kia", "Stinger GT2", 2022, 43000, 23000, "Petrol", "Automatic", "Sedan", 3300, 368, 5, "AWD", "Austin", "Used", 4.8, 20, "Performance", 8, 8),

        ("Tesla", "Model 3 Performance", 2023, 49000, 9500, "Electric", "Automatic", "Sedan", 0, 455, 5, "AWD", "San Jose", "Like New", 4.9, 113, "Performance", 8, 8),
        ("Tesla", "Model Y Performance", 2023, 52000, 12000, "Electric", "Automatic", "SUV", 0, 455, 5, "AWD", "Los Angeles", "Like New", 4.8, 111, "Performance", 8, 8),
        ("Tesla", "Model X Plaid", 2023, 97000, 8000, "Electric", "Automatic", "SUV", 0, 1020, 6, "AWD", "Miami", "Like New", 4.9, 91, "Performance", 10, 8),

        ("Lexus", "IS 350 F Sport", 2023, 44500, 15000, "Petrol", "Automatic", "Sedan", 3500, 311, 5, "RWD", "Houston", "Like New", 4.8, 23, "Performance", 8, 10),
        ("Lexus", "TX 350 Luxury", 2024, 61000, 5000, "Petrol", "Automatic", "SUV", 2400, 275, 7, "AWD", "Dallas", "Like New", 4.9, 23, "Family", 9, 10),
        ("Lexus", "UX 250h F Sport", 2023, 35500, 13000, "Hybrid", "CVT", "SUV", 2000, 181, 5, "AWD", "Austin", "Like New", 4.8, 42, "Daily Commute", 8, 10),
        ("Lexus", "LS 500 AWD", 2022, 72000, 24000, "Petrol", "Automatic", "Sedan", 3400, 416, 5, "AWD", "Atlanta", "Used", 4.8, 21, "Luxury", 10, 10),

        ("Nissan", "Pathfinder Platinum", 2023, 47000, 16000, "Petrol", "Automatic", "SUV", 3500, 284, 7, "4WD", "Charlotte", "Like New", 4.6, 23, "Family", 7, 7),
        ("Nissan", "Frontier PRO-4X", 2023, 38500, 17000, "Petrol", "Automatic", "Pickup", 3800, 310, 5, "4WD", "San Antonio", "Like New", 4.6, 19, "Off-road", 6, 8),
        ("Nissan", "Leaf SV Plus", 2022, 22000, 26000, "Electric", "Automatic", "Hatchback", 0, 214, 5, "FWD", "Seattle", "Used", 4.5, 108, "Daily Commute", 4, 8),
        ("Nissan", "Sentra SR", 2022, 19500, 31000, "Petrol", "CVT", "Sedan", 2000, 149, 5, "FWD", "Memphis", "Used", 4.4, 33, "Daily Commute", 4, 7),

        ("Volkswagen", "Golf GTI Autobahn", 2023, 37500, 12000, "Petrol", "Manual", "Hatchback", 2000, 241, 5, "FWD", "Chicago", "Like New", 4.8, 27, "Performance", 7, 8),
        ("Volkswagen", "ID.4 Pro S AWD", 2023, 43500, 14000, "Electric", "Automatic", "SUV", 0, 295, 5, "AWD", "Denver", "Like New", 4.6, 99, "Daily Commute", 7, 8),
        ("Volkswagen", "Atlas Cross Sport", 2022, 34000, 28000, "Petrol", "Automatic", "SUV", 3600, 276, 5, "AWD", "Detroit", "Used", 4.5, 20, "Family", 6, 7),
        ("Volkswagen", "Jetta GLI", 2023, 30500, 15000, "Petrol", "Automatic", "Sedan", 2000, 228, 5, "FWD", "Cincinnati", "Like New", 4.7, 30, "Performance", 6, 8),

        ("Volvo", "XC90 Recharge Plug-in", 2023, 67000, 14000, "Hybrid", "Automatic", "SUV", 2000, 455, 7, "AWD", "Boston", "Like New", 4.8, 58, "Family", 9, 8),
        ("Volvo", "XC60 B5 Ultimate", 2023, 49000, 16000, "Petrol", "Automatic", "SUV", 2000, 247, 5, "AWD", "Seattle", "Like New", 4.7, 25, "Luxury", 9, 8),
        ("Volvo", "S60 Recharge AWD", 2023, 48000, 12000, "Hybrid", "Automatic", "Sedan", 2000, 455, 5, "AWD", "San Francisco", "Like New", 4.8, 60, "Performance", 9, 8),
        ("Volvo", "V60 Cross Country", 2022, 42000, 25000, "Petrol", "Automatic", "Wagon", 2000, 250, 5, "AWD", "Boulder", "Used", 4.8, 25, "Off-road", 8, 8),

        ("Chevrolet", "Corvette Stingray 2LT", 2023, 76000, 8000, "Petrol", "Automatic", "Coupe", 6200, 495, 2, "RWD", "Tampa", "Like New", 4.9, 19, "Performance", 8, 8),
        ("Chevrolet", "Silverado 1500 High Country", 2022, 53000, 32000, "Diesel", "Automatic", "Pickup", 3000, 277, 5, "4WD", "Dallas", "Used", 4.6, 24, "Off-road", 7, 8),
        ("Chevrolet", "Tahoe Premier", 2023, 64500, 19000, "Petrol", "Automatic", "SUV", 5300, 355, 8, "4WD", "Houston", "Like New", 4.7, 18, "Family", 8, 8),
        ("Chevrolet", "Bolt EUV Premier", 2023, 27500, 14000, "Electric", "Automatic", "Hatchback", 0, 200, 5, "FWD", "Austin", "Like New", 4.6, 115, "Daily Commute", 5, 8),

        ("Jeep", "Wrangler Rubicon 4xe", 2023, 54000, 15000, "Hybrid", "Automatic", "SUV", 2000, 375, 5, "4WD", "Moab", "Like New", 4.7, 49, "Off-road", 7, 7),
        ("Jeep", "Grand Cherokee Summit", 2022, 49000, 27000, "Petrol", "Automatic", "SUV", 3600, 293, 5, "4WD", "Denver", "Used", 4.6, 21, "Luxury", 8, 7),
        ("Jeep", "Gladiator Overland", 2022, 41000, 30000, "Petrol", "Automatic", "Pickup", 3600, 285, 5, "4WD", "Phoenix", "Used", 4.5, 19, "Off-road", 6, 7),

        ("Genesis", "GV70 3.5T Sport", 2023, 53000, 13000, "Petrol", "Automatic", "SUV", 3500, 375, 5, "AWD", "Los Angeles", "Like New", 4.9, 21, "Luxury", 9, 9),
        ("Genesis", "G80 2.5T", 2023, 51000, 14000, "Petrol", "Automatic", "Sedan", 2500, 300, 5, "AWD", "Dallas", "Like New", 4.8, 25, "Business", 9, 9),
        ("Genesis", "Electrified GV70", 2023, 62000, 9000, "Electric", "Automatic", "SUV", 0, 429, 5, "AWD", "San Jose", "Like New", 4.8, 91, "Luxury", 9, 9),
    ]

    current_id = len(data) + 1
    for item in extra_cars:
        car_dict = {
            "id": current_id,
            "brand": item[0],
            "model": item[1],
            "year": item[2],
            "price": item[3],
            "mileage": item[4],
            "fuel_type": item[5],
            "transmission": item[6],
            "body_type": item[7],
            "engine_cc": item[8],
            "horsepower": item[9],
            "seats": item[10],
            "drive_type": item[11],
            "city": item[12],
            "condition": item[13],
            "rating": item[14],
            "fuel_economy": item[15],
            "usage": item[16],
            "luxury_score": item[17],
            "reliability_score": item[18],
        }
        data.append(car_dict)
        current_id += 1

    # Add systematic variations of budget/commuter/family/performance models to reach 180 records
    cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "Austin", "San Jose", "Seattle", "Denver", "Boston", "Miami"]
    conditions = ["Like New", "Excellent", "Used", "Certified Pre-Owned"]

    base_templates = [
        # Affordable Daily Commuter
        {"brand": "Toyota", "model": "Corolla LE", "price_base": 21500, "mileage_base": 24000, "fuel_type": "Petrol", "transmission": "CVT", "body_type": "Sedan", "engine_cc": 2000, "hp": 169, "seats": 5, "drive": "FWD", "usage": "Daily Commute", "mpg": 35, "lux": 4, "rel": 10},
        {"brand": "Honda", "model": "Civic EX", "price_base": 25500, "mileage_base": 19000, "fuel_type": "Petrol", "transmission": "CVT", "body_type": "Sedan", "engine_cc": 1500, "hp": 180, "seats": 5, "drive": "FWD", "usage": "Daily Commute", "mpg": 36, "lux": 5, "rel": 9},
        {"brand": "Hyundai", "model": "Elantra SEL", "price_base": 20500, "mileage_base": 28000, "fuel_type": "Petrol", "transmission": "CVT", "body_type": "Sedan", "engine_cc": 2000, "hp": 147, "seats": 5, "drive": "FWD", "usage": "Daily Commute", "mpg": 34, "lux": 4, "rel": 8},
        {"brand": "Nissan", "model": "Versa SR", "price_base": 17500, "mileage_base": 22000, "fuel_type": "Petrol", "transmission": "CVT", "body_type": "Sedan", "engine_cc": 1600, "hp": 122, "seats": 5, "drive": "FWD", "usage": "Daily Commute", "mpg": 35, "lux": 3, "rel": 7},
        {"brand": "Kia", "model": "Soul EX", "price_base": 21000, "mileage_base": 25000, "fuel_type": "Petrol", "transmission": "CVT", "body_type": "Hatchback", "engine_cc": 2000, "hp": 147, "seats": 5, "drive": "FWD", "usage": "Daily Commute", "mpg": 31, "lux": 4, "rel": 8},
        
        # Family SUV & Minivan
        {"brand": "Toyota", "model": "Highlander XLE", "price_base": 39500, "mileage_base": 26000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 2400, "hp": 265, "seats": 8, "drive": "AWD", "usage": "Family", "mpg": 24, "lux": 7, "rel": 10},
        {"brand": "Honda", "model": "CR-V EX-L", "price_base": 32500, "mileage_base": 21000, "fuel_type": "Petrol", "transmission": "CVT", "body_type": "SUV", "engine_cc": 1500, "hp": 190, "seats": 5, "drive": "AWD", "usage": "Family", "mpg": 29, "lux": 6, "rel": 9},
        {"brand": "Hyundai", "model": "Santa Fe SEL", "price_base": 31000, "mileage_base": 27000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 2500, "hp": 191, "seats": 5, "drive": "FWD", "usage": "Family", "mpg": 26, "lux": 6, "rel": 8},
        {"brand": "Ford", "model": "Explorer XLT", "price_base": 34500, "mileage_base": 31000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 2300, "hp": 300, "seats": 7, "drive": "AWD", "usage": "Family", "mpg": 22, "lux": 6, "rel": 7},
        {"brand": "Kia", "model": "Telluride EX", "price_base": 42000, "mileage_base": 23000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 3800, "hp": 291, "seats": 8, "drive": "AWD", "usage": "Family", "mpg": 21, "lux": 7, "rel": 8},
        
        # Eco & Hybrid
        {"brand": "Toyota", "model": "Prius XLE", "price_base": 30500, "mileage_base": 14000, "fuel_type": "Hybrid", "transmission": "CVT", "body_type": "Hatchback", "engine_cc": 2000, "hp": 196, "seats": 5, "drive": "AWD", "usage": "Daily Commute", "mpg": 54, "lux": 6, "rel": 10},
        {"brand": "Honda", "model": "Accord Hybrid EX-L", "price_base": 33500, "mileage_base": 17000, "fuel_type": "Hybrid", "transmission": "CVT", "body_type": "Sedan", "engine_cc": 2000, "hp": 204, "seats": 5, "drive": "FWD", "usage": "Business", "mpg": 48, "lux": 7, "rel": 9},
        {"brand": "Kia", "model": "Niro Hybrid LX", "price_base": 25500, "mileage_base": 19000, "fuel_type": "Hybrid", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 1600, "hp": 139, "seats": 5, "drive": "FWD", "usage": "Daily Commute", "mpg": 53, "lux": 5, "rel": 8},
        {"brand": "Lexus", "model": "RX 500h F Sport", "price_base": 63000, "mileage_base": 9000, "fuel_type": "Hybrid", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 2400, "hp": 366, "seats": 5, "drive": "AWD", "usage": "Luxury", "mpg": 27, "lux": 9, "rel": 10},

        # Executive & Luxury
        {"brand": "Audi", "model": "A3 Premium", "price_base": 34000, "mileage_base": 22000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Sedan", "engine_cc": 2000, "hp": 201, "seats": 5, "drive": "FWD", "usage": "Business", "mpg": 32, "lux": 8, "rel": 7},
        {"brand": "BMW", "model": "430i Gran Coupe", "price_base": 46000, "mileage_base": 17000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Hatchback", "engine_cc": 2000, "hp": 255, "seats": 5, "drive": "RWD", "usage": "Luxury", "mpg": 28, "lux": 9, "rel": 8},
        {"brand": "Mercedes", "model": "CLA 250", "price_base": 37000, "mileage_base": 23000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Sedan", "engine_cc": 2000, "hp": 221, "seats": 5, "drive": "FWD", "usage": "Luxury", "mpg": 29, "lux": 8, "rel": 7},
        {"brand": "Lexus", "model": "RC 350 F Sport", "price_base": 48500, "mileage_base": 16000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Coupe", "engine_cc": 3500, "hp": 311, "seats": 4, "drive": "RWD", "usage": "Performance", "mpg": 22, "lux": 9, "rel": 10},

        # Performance & Muscle
        {"brand": "Ford", "model": "Mustang EcoBoost", "price_base": 29500, "mileage_base": 21000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Coupe", "engine_cc": 2300, "hp": 315, "seats": 4, "drive": "RWD", "usage": "Performance", "mpg": 26, "lux": 5, "rel": 8},
        {"brand": "BMW", "model": "M240i xDrive", "price_base": 51000, "mileage_base": 12000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Coupe", "engine_cc": 3000, "hp": 382, "seats": 4, "drive": "AWD", "usage": "Performance", "mpg": 26, "lux": 8, "rel": 8},
        {"brand": "Audi", "model": "S5 Sportback", "price_base": 58000, "mileage_base": 14000, "fuel_type": "Petrol", "transmission": "Automatic", "body_type": "Hatchback", "engine_cc": 3000, "hp": 349, "seats": 5, "drive": "AWD", "usage": "Performance", "mpg": 24, "lux": 9, "rel": 8},
        {"brand": "Chevrolet", "model": "Camaro SS 1LE", "price_base": 43500, "mileage_base": 18000, "fuel_type": "Petrol", "transmission": "Manual", "body_type": "Coupe", "engine_cc": 6200, "hp": 455, "seats": 4, "drive": "RWD", "usage": "Performance", "mpg": 19, "lux": 6, "rel": 8},

        # Electric Innovation
        {"brand": "Tesla", "model": "Model 3 RWD", "price_base": 34500, "mileage_base": 18000, "fuel_type": "Electric", "transmission": "Automatic", "body_type": "Sedan", "engine_cc": 0, "hp": 271, "seats": 5, "drive": "RWD", "usage": "Daily Commute", "mpg": 138, "lux": 8, "rel": 8},
        {"brand": "Ford", "model": "Mustang Mach-E GT", "price_base": 55000, "mileage_base": 11000, "fuel_type": "Electric", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 0, "hp": 480, "seats": 5, "drive": "AWD", "usage": "Performance", "mpg": 84, "lux": 8, "rel": 8},
        {"brand": "Hyundai", "model": "Ioniq 5 Standard", "price_base": 38000, "mileage_base": 15000, "fuel_type": "Electric", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 0, "hp": 225, "seats": 5, "drive": "RWD", "usage": "Daily Commute", "mpg": 114, "lux": 7, "rel": 9},
        {"brand": "Kia", "model": "EV6 GT", "price_base": 58000, "mileage_base": 9000, "fuel_type": "Electric", "transmission": "Automatic", "body_type": "SUV", "engine_cc": 0, "hp": 576, "seats": 5, "drive": "AWD", "usage": "Performance", "mpg": 79, "lux": 8, "rel": 8},
    ]

    while len(data) < 185:
        tmpl = random.choice(base_templates)
        year_val = random.choice([2021, 2022, 2023, 2024])
        price_diff = random.randint(-2000, 3000)
        mileage_diff = random.randint(-5000, 10000)
        
        car_dict = {
            "id": len(data) + 1,
            "brand": tmpl["brand"],
            "model": f"{tmpl['model']} {'Plus' if random.random() > 0.5 else 'Special'}",
            "year": year_val,
            "price": max(15000, tmpl["price_base"] + price_diff),
            "mileage": max(4000, tmpl["mileage_base"] + mileage_diff),
            "fuel_type": tmpl["fuel_type"],
            "transmission": tmpl["transmission"],
            "body_type": tmpl["body_type"],
            "engine_cc": tmpl["engine_cc"],
            "horsepower": tmpl["hp"],
            "seats": tmpl["seats"],
            "drive_type": tmpl["drive"],
            "city": random.choice(cities),
            "condition": random.choice(conditions),
            "rating": round(random.uniform(4.4, 4.9), 1),
            "fuel_economy": tmpl["mpg"],
            "usage": tmpl["usage"],
            "luxury_score": tmpl["lux"],
            "reliability_score": tmpl["rel"],
        }
        data.append(car_dict)

    return data

if __name__ == "__main__":
    dataset = build_full_dataset()
    
    # Save CSV
    csv_file = "data/cars.csv"
    fieldnames = [
        "id", "brand", "model", "year", "price", "mileage", "fuel_type", 
        "transmission", "body_type", "engine_cc", "horsepower", "seats", 
        "drive_type", "city", "condition", "rating", "fuel_economy", 
        "usage", "luxury_score", "reliability_score"
    ]
    with open(csv_file, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for car in dataset:
            writer.writerow(car)
            
    print(f"Generated {len(dataset)} cars in {csv_file}")
