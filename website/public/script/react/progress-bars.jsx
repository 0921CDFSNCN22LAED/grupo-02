'use strict';

function ProgressBars(props) {
    return (
        <div class="container-c ">
            <h2>Progreso</h2>
            <div class="item">
                <table class="table table-hover">
                    <tr>
                        <th>Hijo</th>
                        <th>Clase</th>
                        <th>Progreso</th>
                    </tr>
                    <tr>
                        <td>Hijo 1</td>
                        <td>Clase 1</td>
                        <td>Barra de progreso</td>
                    </tr>
                    <tr>
                        <td>Hijo 2</td>
                        <td>Clase 2</td>
                        <td>Barra de progreso</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

ReactDOM.render(<ProgressBars />, document.getElementById('progress-bars'));
