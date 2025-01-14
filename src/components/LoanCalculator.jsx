import { useState } from 'react';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [results, setResults] = useState(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(loanTerm);

    if (!principal || !annualRate || !years) {
      alert('Por favor, preencha todos os campos com valores válidos');
      return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const totalMonths = years * 12;

    const monthlyPayment = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalPayment = monthlyPayment * totalMonths;
    const totalInterest = totalPayment - principal;

    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      principal
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">
        Simulador de Financiamento Imobiliário
      </h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Valor do Imóvel (R$)
          </label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ex: 300000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Taxa de Juros Anual (%)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ex: 8.5"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prazo (anos)
          </label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ex: 30"
          />
        </div>

        <button
          onClick={calculateLoan}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calcular
        </button>
      </div>

      {results && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md space-y-2">
          <h3 className="font-semibold text-lg mb-3">Resultados da Simulação</h3>
          <p>
            Prestação Mensal: R$ {results.monthlyPayment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p>
            Valor Total do Financiamento: R$ {results.totalPayment.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p>
            Total de Juros: R$ {results.totalInterest.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p>
            Valor Financiado: R$ {results.principal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;