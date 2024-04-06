import { useReducer, useState } from 'react';
import { Pencil, Trash } from 'lucide-react';

// Define initial state
const initialState = {
  debitAccount: '',
  debitNarration: '',
  credits: [],
};

// Reducer function
const transactionReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DEBIT':
      return {
        ...state,
        debitAccount: action.payload.account,
        debitNarration: action.payload.narration,
      };
    case 'ADD_CREDIT':
      return { ...state, credits: [...state.credits, action.payload] };
    case 'REMOVE_CREDIT':
      return {
        ...state,
        credits: state.credits.filter((_, index) => index !== action.payload),
      };
    case 'EDIT_CREDIT':
      const updatedCredits = [...state.credits];
      updatedCredits[action.payload.index] = {
        ...updatedCredits[action.payload.index],
        ...action.payload.credit,
      };
      return { ...state, credits: updatedCredits };
    default:
      throw new Error();
  }
};

const Tabled = () => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);
  const [creditAccount, setCreditAccount] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [creditNarration, setCreditNarration] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({
    narration: '',
    account: '',
    amount: '',
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const addCreditTransaction = () => {
    const result = creditTransactionSchema.safeParse({
      account: creditAccount,
      narration: creditNarration,
      amount: creditAmount,
    });

    if (!result.success) {
      // handle validation errors
      const errorMsg = result.error.errors[0].message;
      toast.error(errorMsg);
      return;
    }

    dispatch({
      type: 'ADD_CREDIT',
      payload: result.data,
    });
    setCreditAccount('');
    setCreditAmount('');
    //   setCreditNarration('');
  };

  return (
    <div className="w-full mx-auto my-8 overflow-x-auto h-max-[80vh]">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        {/* Fix the code here */}
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="text-left py-3 px-4 font-semibold text-sm">
              Short Link
            </th>
            <th className="text-left py-3 px-4 font-semibold text-sm">
              Original Link
            </th>
            <th className="text-left py-3 px-4 font-semibold text-sm">
              QR Code
            </th>
            <th className="text-left py-3 px-4 font-semibold text-sm">
              Clicks
            </th>
            <th className="text-left py-3 px-4 font-semibold text-sm">
              Status
            </th>
            <th className="text-left py-3 px-4 font-semibold text-sm">Date</th>
            <th className="text-left py-3 px-4 font-semibold text-sm">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {state.credits.map((credit, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {editingIndex === index ? (
                <>
                  <td className="py-3 px-4">
                    <Input
                      type="text"
                      value={editData.narration}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          narration: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="py-3 px-4">
                    <Input
                      type="text"
                      value={editData.account}
                      onChange={(e) =>
                        setEditData({ ...editData, account: e.target.value })
                      }
                    />
                  </td>
                  <td className="py-3 px-4">
                    <Input
                      type="text"
                      value={editData.amount}
                      onChange={(e) =>
                        setEditData({ ...editData, amount: e.target.value })
                      }
                    />
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => {
                        dispatch({
                          type: 'EDIT_CREDIT',
                          payload: { index, credit: editData },
                        });
                        setEditingIndex(null);
                      }}
                    >
                      <FaSave size={22} color="green" />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="text-left py-3 px-4">{credit.narration}</td>
                  <td className="text-left py-3 px-4">{credit.account}</td>
                  <td className="text-right py-3 px-4">{credit.amount}</td>
                  <td className="flex p-1">
                    <Pencil
                      size={25}
                      color="blue"
                      onClick={() => {
                        setEditingIndex(index);
                        setEditData(credit);
                      }}
                    />

                    <Trash
                      size={25}
                      color="red"
                      onClick={() =>
                        dispatch({ type: 'REMOVE_CREDIT', payload: index })
                      }
                    />
                  </td>
                </>
              )}
            </tr>
          ))}
          <tr>
            <td colSpan={2} className="py-3 px-4 font-semibold">
              Prev
            </td>
            <td colSpan={3} className="py-3 px-4 font-semibold">
              Current
            </td>
            <td colSpan={2} className="py-3 px-4 font-semibold">
              Next
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Tabled;
