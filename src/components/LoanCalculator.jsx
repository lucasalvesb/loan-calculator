import { useState } from 'react';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [displayLoanAmount, setDisplayLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [results, setResults] = useState(null);
  const [downPayment, setDownPayment] = useState('');
  const [displayDownPayment, setDisplayDownPayment] = useState('');

  // Função para formatar número para moeda brasileira
  const formatToCurrency = (value) => {
    const numericValue = value.replace(/\D/g, '');
    const floatValue = parseFloat(numericValue) / 100;
    
    if (isNaN(floatValue)) {
      return '';
    }

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(floatValue);
  };

  // Função para limpar formatação e retornar apenas números
  const unformatCurrency = (value) => {
    return value.replace(/\D/g, '') || '0';
  };

  const handleLoanAmountChange = (e) => {
  const rawValue = unformatCurrency(e.target.value);
  const formattedValue = formatToCurrency(rawValue);

  setDisplayLoanAmount(formattedValue);
  setLoanAmount(rawValue);

  const downPaymentValue = (rawValue * 0.3).toFixed(0);
  setDownPayment(downPaymentValue);
  setDisplayDownPayment(formatToCurrency(downPaymentValue));
};

  const handleDownPaymentChange = (e) => {
  const rawValue = unformatCurrency(e.target.value);
  const formattedValue = formatToCurrency(rawValue);
  
  setDisplayDownPayment(formattedValue);
  setDownPayment(rawValue);
};

  const calculateLoan = () => {
    const principal = (parseFloat(loanAmount) - parseFloat(downPayment || 0)) / 100;
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
            Valor do Imóvel
          </label>
          <input
            type="text"
            value={displayLoanAmount}
            onChange={handleLoanAmountChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="R$ 0,00"
          />
        </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Valor da Entrada
        </label>
        <input
          type="text"
          value={displayDownPayment}
          onChange={handleDownPaymentChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="R$ 0,00"
        />
      </div>
        <div>
      <div className="flex items-center gap-2 mb-1">
        <label className="block text-sm font-medium text-gray-700">
          Taxa de Juros Anual (%)
        </label>
        <div className="relative group">
          <span className="cursor-help text-gray-400">ℹ️</span>
          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2  w-64"
            style={{ top: "-30px", left: "25px" }}
          >
            Taxa média de juros imobiliário no Brasil - Jan/2025 - 11%
          </div>
        </div>
      </div>
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
            Prestação Mensal: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(results.monthlyPayment)}
          </p>
          <p>
            Valor Total do Financiamento: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(results.totalPayment)}
          </p>
          <p>
            Total de Juros: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(results.totalInterest)}
          </p>
          <p>
            Valor Financiado: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(results.principal)}
          </p>
          <p>
            Valor da Entrada: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(downPayment)/100)}
            {' '}
            ({((parseFloat(downPayment) / parseFloat(loanAmount)) * 100).toFixed(1)}%)
          </p>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;