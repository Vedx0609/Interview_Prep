import './GenerationPage.css';

export default function GenerationPage() {

    return (
        <div className="challenge-container">
            <h2>Hello! You can generate MCQs here!</h2>
            
            <div className="challenge-quota">
                <p>Questions you can generate today: 5</p>
            </div>

            <div className="challenge-difficulty">
                <label htmlFor="difficulty">Select Difficulty:</label>
                <select id="difficulty" name="difficulty">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            <button className="challenge-generate-button">Generate Challenge</button>
        </div>
    )
}