export function calculateTotalOperationTime() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    console.log('inicio mes' + startOfMonth);
    
    let totalOperationMinutes = 0;

    for (let date = startOfMonth; date <= now; date.setDate(date.getDate() + 1)) {
        const dayOfWeek = date.getDay();
        console.log(dayOfWeek);
        

        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            // Lunes a Viernes: 2 turnos de 8 horas cada uno
            totalOperationMinutes += 2 * 8 * 60;
            console.log(totalOperationMinutes);
            
        } else if (dayOfWeek === 6) {
            // Sábado: 2 turnos de 6 horas cada uno
            totalOperationMinutes += 2 * 6 * 60;
        }
        // Domingo: no se trabaja
    }

    console.log(totalOperationMinutes);
    
    return totalOperationMinutes;
}
