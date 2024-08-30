import { NextApiRequest, NextApiResponse } from 'next';

// Define los niveles de dificultad en función del puntaje total
const getDifficultyLevel = (totalScore: number) => {
  if (totalScore <= 5) return 'Principiante';
  if (totalScore <= 10) return 'Intermedio';
  if (totalScore <= 15) return 'Avanzado';
  return 'Experto';
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { answers, totalScore } = req.body;

      // Valida los datos
      if (!Array.isArray(answers) || typeof totalScore !== 'number') {
        return res.status(400).json({ message: 'Datos inválidos' });
      }

      // Calcular el nivel de dificultad
      const difficultyLevel = getDifficultyLevel(totalScore);

      // Aquí podrías guardar las respuestas en una base de datos si es necesario

      // Respuesta con las respuestas y el nivel de dificultad
      return res.status(200).json({
        message: 'Respuestas recibidas y procesadas',
        answers,
        totalScore,
        difficultyLevel,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error al procesar las respuestas' });
    }
  } else {
    // Solo se permiten peticiones POST
    return res.status(405).json({ message: 'Método no permitido' });
  }
}
