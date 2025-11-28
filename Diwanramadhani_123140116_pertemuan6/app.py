from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response
from pyramid.view import view_config
from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
import zope.sqlalchemy
import json

from models import Matakuliah, Base

# --- Database Setup ---
def get_tm_session(session_factory, transaction_manager):
    dbsession = session_factory()
    zope.sqlalchemy.register(dbsession, transaction_manager=transaction_manager)
    return dbsession

def home(request):
    return Response("Selamat datang di API Matakuliah! Silakan akses /api/matakuliah")

# --- View Functions (API Endpoints) ---

# 1. GET All Matakuliah
def get_all_matakuliah(request):
    dbsession = request.dbsession
    matakuliahs = dbsession.query(Matakuliah).all()
    return {'matakuliahs': [mk.to_dict() for mk in matakuliahs]}

# 2. GET One Matakuliah
def get_one_matakuliah(request):
    dbsession = request.dbsession
    mk_id = request.matchdict['id']
    mk = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if mk:
        return mk.to_dict()
    # FIX #1: Added ; charset=UTF-8
    return Response(json.dumps({'error': 'Matakuliah not found'}), status=404, content_type='application/json; charset=UTF-8')

# 3. POST Create Matakuliah
def create_matakuliah(request):
    dbsession = request.dbsession
    try:
        data = request.json_body
        new_mk = Matakuliah(
            kode_mk=data['kode_mk'],
            nama_mk=data['nama_mk'],
            sks=data['sks'],
            semester=data['semester']
        )
        dbsession.add(new_mk)
        dbsession.flush()
        return Response(json.dumps(new_mk.to_dict()), status=201, content_type='application/json; charset=UTF-8')

    except Exception as e:
        # FIX #2: Added ; charset=UTF-8
        return Response(json.dumps({'error': str(e)}), status=400, content_type='application/json; charset=UTF-8')

# 4. PUT Update Matakuliah
def update_matakuliah(request):
    dbsession = request.dbsession
    mk_id = request.matchdict['id']
    mk = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    
    if not mk:
        # FIX #3: Added ; charset=UTF-8 (Jika data tidak ditemukan saat update)
        return Response(json.dumps({'error': 'Matakuliah not found'}), status=404, content_type='application/json; charset=UTF-8')
    
    try:
        data = request.json_body
        mk.kode_mk = data.get('kode_mk', mk.kode_mk)
        mk.nama_mk = data.get('nama_mk', mk.nama_mk)
        mk.sks = data.get('sks', mk.sks)
        mk.semester = data.get('semester', mk.semester)
        return mk.to_dict()
    except Exception as e:
        # FIX #4: Added ; charset=UTF-8 (Jika ada error saat update, misal kode_mk duplikat)
        return Response(json.dumps({'error': str(e)}), status=400, content_type='application/json; charset=UTF-8')


# 5. DELETE Matakuliah
def delete_matakuliah(request):
    dbsession = request.dbsession
    mk_id = request.matchdict['id']
    mk = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    
    if not mk:
        # FIX #5: Added ; charset=UTF-8 (Jika data tidak ditemukan saat delete)
        return Response(json.dumps({'error': 'Matakuliah not found'}), status=404, content_type='application/json; charset=UTF-8')
    
    dbsession.delete(mk)
    # FIX #6: Added ; charset=UTF-8 (Response sukses delete)
    return Response(json.dumps({'message': 'Matakuliah deleted'}), status=200, content_type='application/json; charset=UTF-8')

# --- Main Configuration ---
if __name__ == '__main__':
    settings = {
        'sqlalchemy.url': 'sqlite:///matakuliah.db'
    }
    
    engine = engine_from_config(settings, 'sqlalchemy.')
    session_factory = sessionmaker(bind=engine)
    
    with Configurator(settings=settings) as config:
        config.add_renderer('json', 'pyramid.renderers.json_renderer_factory')
        
        config.include('pyramid_tm')
        config.add_request_method(
            lambda r: get_tm_session(session_factory, r.tm),
            'dbsession',
            reify=True
        )

        # Routes
        config.add_route('home', '/')
        config.add_view(home, route_name='home')
        
        config.add_route('matakuliah_collection', '/api/matakuliah')
        config.add_route('matakuliah_item', '/api/matakuliah/{id}')

        # Views (Controller)
        config.add_view(get_all_matakuliah, route_name='matakuliah_collection', request_method='GET', renderer='json')
        config.add_view(create_matakuliah, route_name='matakuliah_collection', request_method='POST', renderer='json')
        config.add_view(get_one_matakuliah, route_name='matakuliah_item', request_method='GET', renderer='json')
        config.add_view(update_matakuliah, route_name='matakuliah_item', request_method='PUT', renderer='json')
        config.add_view(delete_matakuliah, route_name='matakuliah_item', request_method='DELETE', renderer='json')

        app = config.make_wsgi_app()

    print("Server berjalan di http://0.0.0.0:6543")
    server = make_server('0.0.0.0', 6543, app)
    server.serve_forever()