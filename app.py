"""
AutoMatch AI - Intelligent Car Recommendation System.
DecodeLabs Artificial Intelligence - Project 3.
Author: Abdullah Zafar (Batch 2026).

Flask Web Application Entry Point.
Provides RESTful APIs and server-rendered routes for car recommendations,
side-by-side comparison, analytics, and preference profiling.
"""

import os
from flask import Flask, render_template, request, jsonify, redirect, url_for
from models.recommendation_engine import CarRecommendationEngine
from utils.preprocessing import compute_dataset_statistics

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "automatch-ai-secret-2026")

# Initialize recommendation engine
engine = CarRecommendationEngine()


@app.route("/")
def index():
    """Renders the main dashboard and interactive recommendation form."""
    stats = engine.stats or compute_dataset_statistics(engine.cars)
    return render_template("index.html", stats=stats, cars=engine.cars[:12])


@app.route("/recommend", methods=["POST", "GET"])
def recommend():
    """Processes user preferences and returns ranked recommendations."""
    if request.method == "POST":
        data = request.form
    else:
        data = request.args

    # Extract and parse user preferences
    min_budget = float(data.get("min_budget", 0)) if data.get("min_budget") else None
    max_budget = float(data.get("max_budget", 0)) if data.get("max_budget") else None
    
    # Check invalid budget bounds
    if min_budget and max_budget and min_budget > max_budget:
        min_budget, max_budget = max_budget, min_budget

    preferences = {
        "min_budget": min_budget,
        "max_budget": max_budget,
        "brand": data.get("brand", "Any"),
        "body_type": data.get("body_type", "Any"),
        "fuel_type": data.get("fuel_type", "Any"),
        "transmission": data.get("transmission", "Any"),
        "max_mileage": float(data.get("max_mileage", 0)) if data.get("max_mileage") else None,
        "engine_cc": float(data.get("engine_cc", 0)) if data.get("engine_cc") else None,
        "min_horsepower": float(data.get("min_horsepower", 0)) if data.get("min_horsepower") else None,
        "seats": int(data.get("seats", 0)) if data.get("seats") and int(data.get("seats")) > 0 else None,
        "drive_type": data.get("drive_type", "Any"),
        "usage": data.get("usage", "Any"),
        "priority": data.get("priority", "Budget"),
    }

    top_n = int(data.get("top_n", 5))
    results = engine.recommend_cars(preferences, top_n=top_n)

    # If API requested (JSON format)
    if request.headers.get("X-Requested-With") == "XMLHttpRequest" or request.is_json or request.args.get("format") == "json":
        return jsonify(results)

    return render_template(
        "recommendations.html",
        results=results,
        preferences=preferences,
        applied_weights=results["applied_weights"],
        recommendations=results["recommendations"],
        meta=results["meta"]
    )


@app.route("/compare", methods=["GET", "POST"])
def compare():
    """Renders side-by-side comparison for selected car IDs."""
    car_ids = []
    if request.method == "POST":
        car_ids = request.form.getlist("car_ids")
    else:
        ids_param = request.args.get("ids", "")
        if ids_param:
            car_ids = [x.strip() for x in ids_param.split(",") if x.strip()]

    selected_cars = [c for c in engine.cars if str(c["id"]) in car_ids]
    return render_template("compare.html", cars=selected_cars)


# REST API Endpoints for Modern Frontend / SPAs
@app.route("/api/recommend", methods=["POST"])
def api_recommend():
    """JSON API for computing car recommendations."""
    payload = request.get_json(silent=True) or {}
    top_n = int(payload.get("top_n", 5))
    results = engine.recommend_cars(payload, top_n=top_n)
    return jsonify(results)


@app.route("/api/cars", methods=["GET"])
def api_cars():
    """Returns dataset cars with optional search/filtering."""
    brand = request.args.get("brand")
    fuel = request.args.get("fuel_type")
    body = request.args.get("body_type")
    max_price = request.args.get("max_price", type=float)

    filtered = engine.cars
    if brand and brand != "Any":
        filtered = [c for c in filtered if c["brand"].lower() == brand.lower()]
    if fuel and fuel != "Any":
        filtered = [c for c in filtered if c["fuel_type"].lower() == fuel.lower()]
    if body and body != "Any":
        filtered = [c for c in filtered if c["body_type"].lower() == body.lower()]
    if max_price:
        filtered = [c for c in filtered if c["price"] <= max_price]

    return jsonify({"total": len(filtered), "cars": filtered})


@app.route("/api/analytics", methods=["GET"])
def api_analytics():
    """Returns dataset summary statistics for charts and dashboard."""
    stats = engine.stats or compute_dataset_statistics(engine.cars)
    return jsonify(stats)


@app.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint."""
    return jsonify({
        "status": "healthy",
        "app": "AutoMatch AI",
        "author": "Abdullah Zafar",
        "batch": 2026,
        "total_cars": len(engine.cars)
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
