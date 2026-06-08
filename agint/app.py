from flask import Flask, request, render_template
import pandas as pd

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signup', methods=['POST'])
def signup():
    email = request.form['email']
    # Load existing emails or create a new DataFrame
    try:
        data = pd.read_excel('emails.xlsx')
    except FileNotFoundError:
        data = pd.DataFrame(columns=['Email'])

    # Append the new email and save
    data = pd.concat([data, pd.DataFrame([{'Email': email}])], ignore_index=True)
    data.to_excel('emails.xlsx', index=False)

    return "Thank you for signing up!"

if __name__ == '__main__':
    app.run(debug=True)
