import { cookies } from 'next/headers';
import DBConnection  from '@/lib/db';

export async function GET() {
    var cookie = await cookies()
    const sessionToken = cookie.get('session_token')?.value;
    if (!sessionToken) {
        
        return Response.json({ error: '401', reason: 'Not Logged In' }, { status: 401 });
    }
    const dbConnection = await DBConnection();

    const [session] = await dbConnection.execute(`SELECT * FROM users WHERE session_token = ?`, [sessionToken]);
    
    dbConnection.end()
    

    
    if (session.length === 0) {
        cookie.delete('session_token');
        return Response.json({ error: '401', reason: 'Invalid Session' }, { status: 401 });
        
    }
    const user = session[0];
    return Response.json(user);
}