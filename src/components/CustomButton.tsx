import { Button, IconButton } from "@mui/material";


interface CustomButtonProps {
    label?: string;
    onClick: () => void;
    disabled?: boolean;
    color?: 'primary' | 'secondary' | 'inherit';
    variant?: 'text' | 'outlined' | 'contained';
    tips?: string;
    icon?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    onClick,
    disabled = false,
    color = 'primary',
    variant = 'contained',
    tips,
    icon
}) => {
    return (
       <>
        {
            icon ? (
                <IconButton
                sx={{borderRadius: 0}}
                    onClick={onClick}
                    disabled={disabled}
                    color={color}
                    title={tips}
                >
                    {icon}
                </IconButton>
            ) : (
                <Button
                    onClick={onClick}
                    disabled={disabled}
                    color={color}
                    variant={variant}
                >
                    {label}
                </Button>
            )
        }
       </>
    );
};

export default CustomButton;