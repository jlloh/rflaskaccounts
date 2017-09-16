from flask import g, current_app
import pymysql

class User:
    """
    initialize User class with username
    """
    def __init__(self, username):
        """
        assumption that username is a unicode, and equivalent to the user_id field that flask-login requires
        """
        self.username = username

        self.is_active = True
        self.is_authenticated0 = False

        con = connect_db()
        cur = con.cursor()
        userid = None

        query = cur.mogrify('SELECT id, roles from users where email = %s' ,[str(self.username)])
        print query
        cur.execute(query)
        for row in cur.fetchall():
            print row
            userid, role= row
        con.close()
        print userid
        if userid is not None:
            self.is_anonymous_ = False
            self.userid = userid
            self.role = role
            print 'User exists'
        else:
            self.is_anonymous_ = True
            self.userid = None
            self.role = None


    def is_authenticated(self):
        """
        fudging misleading. this isn't whether the user password has been logged in, but rather any valid user. I guess you disable this if you want to lock somebody out.
        """
        return True

    def is_active(self):
        return self.is_active

    def is_anonymous(self):
        return self.is_anonymous_

    def get_id(self):
        if self.is_anonymous()==False:
            return unicode(self.username)
        return None

    def get_userid(self):
        if self.is_anonymous()==False:
            return unicode(self.userid)
        return None

    def get_userrole(self):
        if self.is_anonymous()==False:
            return self.role
        return None

    def get_usercountry(self):
        if self.is_anonymous()==False:
            return self.country
        return None

def connect_db():
    """
    No input arguments. Just connects to database
    """
    host = current_app.config['HOST']
    user = current_app.config['USER']
    password = current_app.config['PASSWORD']
    port = current_app.config['PORT']
    dbname = current_app.config['DBNAME']
    con = pymysql.connect(host = host
                        , user = user
                        , password = password
                        , port = port
                        , db = dbname
                        , charset='utf8mb4'
                        , local_infile = True)
    return con

def get_db():
    db = getattr(g, '_mysql_database', None)
    if db is None:
        db = g._mysql_database = connect_db()
    return db
