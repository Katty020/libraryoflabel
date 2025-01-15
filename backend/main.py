import random
import string
from flask import Flask, jsonify, request

app = Flask(_name_)

MAX_PAGES = 410
PAGE_LENGTH = 3200

def generate_random_text(length, query=None):
    characters = string.ascii_letters + string.digits + ",.-/!@#$%^&*()_+="
    text = ''.join(random.choice(characters) for _ in range(length))

    if query:
        text = text.replace(random.choice(text), query, 1)

    return text

def generate_book_content(book_id, query=None):
    return [generate_random_text(PAGE_LENGTH, query) for _ in range(MAX_PAGES)]

@app.route('/')
def home():
    return jsonify({
        'message': 'Welcome to the Library of Babel. Use the /search and /book/<book_id>/page/<page_num> routes for API access.'
    })

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '').strip()
    
    if query:
        
        book_content = generate_book_content(1, query)

        found_pages = []
        for page_num, page_content in enumerate(book_content, 1):
            if query.lower() in page_content.lower(): 
                found_pages.append(page_num)

        if found_pages:
            return jsonify({
                'query': query,
                'found_pages': found_pages
            })
        else:
            return jsonify({
                'query': query,
                'message': 'Search term not found in the library.'
            })
    else:
        return jsonify({
            'message': 'No query entered. Please enter a search term.'
        })

@app.route('/book/<book_id>/page/<int:page_num>', methods=['GET'])
def book_page(book_id, page_num):
   
    if page_num < 1:
        page_num = 1
    if page_num > MAX_PAGES:
        page_num = MAX_PAGES

    book_content = generate_book_content(book_id)
    page_content = book_content[page_num - 1]

    response_data = {
        'book_id': book_id,
        'page_num': page_num,
        'page_content': page_content,
        'next_page': page_num + 1 if page_num < MAX_PAGES else MAX_PAGES,
        'prev_page': page_num - 1 if page_num > 1 else 1
    }

    return jsonify(response_data)

if _name_ == '_main_':
    app.run(debug=True)