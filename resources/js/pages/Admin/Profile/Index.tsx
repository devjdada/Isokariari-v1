import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";
import type { PageProps } from "@/types";

interface UserProfile extends PageProps {
	user: {
		id: number;
		name: string;
		email: string;
		avatar?: string | null;
	};
}

export default function Profile({ auth, user }: UserProfile) {
	const { data, setData, post, processing, errors, reset } = useForm({
		name: user.name,
		email: user.email,
	});

	const {
		data: passwordData,
		setData: setPasswordData,
		post: postPassword,
		processing: passwordProcessing,
		errors: passwordErrors,
		reset: resetPassword,
	} = useForm({
		current_password: "",
		password: "",
		password_confirmation: "",
	});

	const {
		data: avatarData,
		setData: setAvatarData,
		post: postAvatar,
		processing: avatarProcessing,
		errors: avatarErrors,
		reset: resetAvatar,
	} = useForm({
		avatar: null as File | null,
	});

	const [avatarPreview, setAvatarPreview] = useState<string | null>(
		user.avatar || null,
	);

	const handleProfileUpdate = (e: React.FormEvent) => {
		e.preventDefault();
		post(route("admin.profile.update"), {
			onSuccess: () => {
				// Optionally, show a success message
			},
			onError: (errors) => {
				console.error("Profile update errors:", errors);
			},
		});
	};

	const handlePasswordUpdate = (e: React.FormEvent) => {
		e.preventDefault();
		postPassword(route("admin.profile.updatePassword"), {
			onSuccess: () => {
				resetPassword();
				// Optionally, show a success message
			},
			onError: (errors) => {
				console.error("Password update errors:", errors);
			},
		});
	};

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setAvatarData("avatar", file);

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setAvatarPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		} else {
			setAvatarPreview(null);
		}
	};

	const handleAvatarUpload = (e: React.FormEvent) => {
		e.preventDefault();
		postAvatar(route("admin.profile.updateAvatar"), {
			forceFormData: true,
			onSuccess: () => {
				// Optionally, show a success message
			},
			onError: (errors) => {
				console.error("Avatar upload errors:", errors);
			},
		});
	};

	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<h2 className="font-semibold text-xl text-gray-800 leading-tight">
					Profile
				</h2>
			}
		>
			<Head title="Profile" />

			<div className="py-12">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
					{/* Profile Information */}
					<div className="p-4 sm:p-8  shadow sm:rounded-lg">
						<h3 className="text-lg font-medium  mb-4">Profile Information</h3>
						<form onSubmit={handleProfileUpdate} className="mt-6 space-y-6">
							<div>
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									type="text"
									className="mt-1 block w-full"
									value={data.name}
									onChange={(e) => setData("name", e.target.value)}
									required
									autoFocus
									autoComplete="name"
								/>
								<InputError className="mt-2" message={errors.name} />
							</div>

							<div>
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									className="mt-1 block w-full"
									value={data.email}
									onChange={(e) => setData("email", e.target.value)}
									required
									autoComplete="username"
								/>
								<InputError className="mt-2" message={errors.email} />
							</div>

							<div className="flex items-center gap-4">
								<Button disabled={processing}>Save</Button>
							</div>
						</form>
					</div>

					{/* Update Password */}
					<div className="p-4 sm:p-8 shadow sm:rounded-lg">
						<h3 className="text-lg font-medium  mb-4">Update Password</h3>
						<form onSubmit={handlePasswordUpdate} className="mt-6 space-y-6">
							<div>
								<Label htmlFor="current_password">Current Password</Label>
								<Input
									id="current_password"
									type="password"
									className="mt-1 block w-full"
									value={passwordData.current_password}
									onChange={(e) =>
										setPasswordData("current_password", e.target.value)
									}
									required
									autoComplete="current-password"
								/>
								<InputError
									className="mt-2"
									message={passwordErrors.current_password}
								/>
							</div>

							<div>
								<Label htmlFor="password">New Password</Label>
								<Input
									id="password"
									type="password"
									className="mt-1 block w-full"
									value={passwordData.password}
									onChange={(e) => setPasswordData("password", e.target.value)}
									required
									autoComplete="new-password"
								/>
								<InputError
									className="mt-2"
									message={passwordErrors.password}
								/>
							</div>

							<div>
								<Label htmlFor="password_confirmation">Confirm Password</Label>
								<Input
									id="password_confirmation"
									type="password"
									className="mt-1 block w-full"
									value={passwordData.password_confirmation}
									onChange={(e) =>
										setPasswordData("password_confirmation", e.target.value)
									}
									required
									autoComplete="new-password"
								/>
								<InputError
									className="mt-2"
									message={passwordErrors.password_confirmation}
								/>
							</div>

							<div className="flex items-center gap-4">
								<Button disabled={passwordProcessing}>Save</Button>
							</div>
						</form>
					</div>

					{/* Update Avatar */}
					<div className="p-4 sm:p-8 shadow sm:rounded-lg">
						<h3 className="text-lg font-medium mb-4">Update Avatar</h3>
						<form onSubmit={handleAvatarUpload} className="mt-6 space-y-6">
							<div className="flex items-center space-x-4">
								<div className="flex-shrink-0">
									<img
										className="h-20 w-20 rounded-full object-cover"
										src={avatarPreview || "/images/default-avatar.png"} // Fallback avatar
										alt="User Avatar"
									/>
								</div>
								<div>
									<Label htmlFor="avatar">New Avatar</Label>
									<Input
										id="avatar"
										type="file"
										name="avatar"
										className="mt-1 block w-full"
										onChange={handleAvatarChange}
										accept="image/*"
									/>
									<InputError className="mt-2" message={avatarErrors.avatar} />
								</div>
							</div>
							<div className="flex items-center gap-4">
								<Button disabled={avatarProcessing}>Upload Avatar</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
